import { readPhoto } from "@/features/team/admin";

type RouteContext = { params: Promise<{ file: string }> };

const IMMUTABLE_CACHE = "public, max-age=31536000, immutable";

export async function GET(_request: Request, { params }: RouteContext): Promise<Response> {
  const { file } = await params;
  const photo = await readPhoto(file);

  if (!photo) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(photo.bytes), {
    headers: {
      "Content-Type": photo.mime,
      "Cache-Control": IMMUTABLE_CACHE,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
