import { renderAmpPage } from "@/lib/amp-html";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderAmpPage(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
