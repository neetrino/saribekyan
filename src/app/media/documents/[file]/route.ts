import { readPdf } from "@/features/documents/admin";

type RouteContext = { params: Promise<{ file: string }> };

const IMMUTABLE_CACHE = "public, max-age=31536000, immutable";

export async function GET(_request: Request, { params }: RouteContext): Promise<Response> {
  const { file } = await params;
  const pdf = await readPdf(file);

  if (!pdf) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(pdf.bytes), {
    headers: {
      "Content-Type": pdf.mime,
      "Content-Disposition": "inline",
      "Cache-Control": IMMUTABLE_CACHE,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
