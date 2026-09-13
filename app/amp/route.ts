/**
 * AMP home route (`/amp`).
 *
 * Serves a statically generated HTML ⚡ document.
 *
 * @packageDocumentation
 */

import { renderAmpPage } from "@/lib/amp-html";

/** Build the AMP document at compile time. */
export const dynamic = "force-static";

/**
 * Returns the AMP home page.
 *
 * @returns HTML response with a short cache that always revalidates.
 */
export function GET() {
  return new Response(renderAmpPage(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
