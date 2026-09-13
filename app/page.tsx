/**
 * Home page route (`/`).
 *
 * Renders the community landing page and advertises the AMP alternate.
 *
 * @packageDocumentation
 */

import { HomePage } from "@/ui/paginas/home/home";
import { getAmpUrl } from "@/lib/site";

/** Home page with an `amphtml` link for the AMP counterpart. */
export default function Page() {
  return (
    <>
      <link rel="amphtml" href={getAmpUrl()} />
      <HomePage />
    </>
  );
}
