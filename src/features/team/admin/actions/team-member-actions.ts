"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { requireAdmin } from "@/features/admin-auth";
import { logger } from "@/shared/lib/logger";
import { prisma } from "@/shared/lib/prisma";

import { isValidPlacement } from "../../config/placements";
import { parseTeamForm } from "../lib/parse-team-form";
import { deletePhoto, PhotoValidationError, savePhoto } from "../lib/photo-storage";
import { ADMIN_TEAM_PATH, revalidateTeamPages } from "../lib/revalidate-team-pages";
import { teamMemberIdSchema, type TeamMemberInput } from "../schemas/team-member-schema";
import { isTeamListPath } from "../services/team-filters";
import type { TeamFormState } from "./team-form-state";

type PhotoResult = { url: string | null; uploaded: boolean } | { error: string };

function failure(error: string, fieldErrors: TeamFormState["fieldErrors"] = {}): TeamFormState {
  return { error, fieldErrors };
}

/** Photos only come from uploads; otherwise the stored photo is kept or removed. */
async function resolvePhoto(formData: FormData, currentUrl: string | null): Promise<PhotoResult> {
  if (formData.get("removePhoto") === "on") {
    return { url: null, uploaded: false };
  }
  const file = formData.get("photo");
  if (file instanceof File && file.size > 0) {
    try {
      return { url: await savePhoto(file), uploaded: true };
    } catch (error) {
      if (error instanceof PhotoValidationError) {
        return { error: error.message };
      }
      throw error;
    }
  }
  return { url: currentUrl, uploaded: false };
}

async function persistMember(
  id: string | null,
  data: TeamMemberInput & { photoUrl: string | null },
): Promise<void> {
  const { placements, ...member } = data;

  if (!id) {
    await prisma.teamMember.create({ data: { ...member, placements: { create: placements } } });
    return;
  }

  await prisma.$transaction([
    prisma.teamMember.update({ where: { id }, data: member }),
    prisma.teamMemberPlacement.deleteMany({ where: { memberId: id } }),
    prisma.teamMemberPlacement.createMany({
      data: placements.map((placement) => ({ ...placement, memberId: id })),
    }),
  ]);
}

function readMemberId(formData: FormData): string | null | undefined {
  const raw = formData.get("id");
  if (typeof raw !== "string" || raw === "") {
    return null;
  }
  return teamMemberIdSchema.safeParse(raw).success ? raw : undefined;
}

/** Only admin team list URLs are accepted to avoid open redirects. */
function readReturnPath(formData: FormData): string {
  const raw = formData.get("returnTo");
  return typeof raw === "string" && isTeamListPath(raw) ? raw : ADMIN_TEAM_PATH;
}

/** Creates or updates a member together with all of their page/section placements. */
export async function saveTeamMember(_prev: TeamFormState, formData: FormData): Promise<TeamFormState> {
  await requireAdmin();

  const id = readMemberId(formData);
  if (id === undefined) return failure("errors.invalidId");

  const parsed = parseTeamForm(formData);
  if (!parsed.ok) return parsed.state;

  const existing = id
    ? await prisma.teamMember.findUnique({ where: { id }, include: { placements: true } })
    : null;
  if (id && !existing) return failure("errors.notFound");

  const photo = await resolvePhoto(formData, existing?.photoUrl ?? null);
  if ("error" in photo) return failure("errors.fixFields", { photo: photo.error });

  try {
    await persistMember(id, { ...parsed.data, photoUrl: photo.url });
  } catch (error) {
    logger.error("Failed to save team member", error, { id });
    if (photo.uploaded) await deletePhoto(photo.url);
    return failure("errors.saveFailed");
  }

  if (existing && existing.photoUrl !== photo.url) await deletePhoto(existing.photoUrl);
  revalidateTeamPages([
    ...(existing?.placements.map((placement) => placement.pageKey) ?? []),
    ...parsed.data.placements.map((placement) => placement.pageKey),
  ]);
  redirect(readReturnPath(formData));
}

export async function deleteTeamMember(formData: FormData): Promise<void> {
  await requireAdmin();

  const returnPath = readReturnPath(formData);
  const id = readMemberId(formData);
  if (!id) redirect(returnPath);

  const member = await prisma.teamMember.findUnique({ where: { id }, include: { placements: true } });
  if (member) {
    await prisma.teamMember.delete({ where: { id } });
    await deletePhoto(member.photoUrl);
    revalidateTeamPages(member.placements.map((placement) => placement.pageKey));
  }
  redirect(returnPath);
}

const reorderSchema = z
  .object({
    pageKey: z.string(),
    sectionKey: z.string(),
    placementIds: z.array(teamMemberIdSchema).min(1).max(500),
  })
  .refine((value) => isValidPlacement(value.pageKey, value.sectionKey));

/**
 * Sets a section's display order from a dragged list and renumbers it 1..n.
 * Rejects a list that is not exactly the section's current placements.
 * @returns whether the order was saved.
 */
export async function reorderTeamSection(input: {
  pageKey: string;
  sectionKey: string;
  placementIds: string[];
}): Promise<boolean> {
  await requireAdmin();

  const parsed = reorderSchema.safeParse(input);
  if (!parsed.success) return false;
  const { pageKey, sectionKey, placementIds } = parsed.data;
  if (new Set(placementIds).size !== placementIds.length) return false;

  const siblings = await prisma.teamMemberPlacement.findMany({
    where: { pageKey, sectionKey },
    select: { id: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  const currentIds = new Set(siblings.map((item) => item.id));
  const sameSet = currentIds.size === placementIds.length && placementIds.every((id) => currentIds.has(id));
  if (!sameSet) return false;
  if (siblings.every((item, index) => item.id === placementIds[index])) return true;

  await prisma.$transaction(
    placementIds.map((id, index) =>
      prisma.teamMemberPlacement.update({ where: { id }, data: { sortOrder: index + 1 } }),
    ),
  );
  revalidateTeamPages([pageKey]);
  return true;
}
