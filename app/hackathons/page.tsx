/**
 * Hackathons agenda route (`/hackathons`).
 *
 * @packageDocumentation
 */

import type { Metadata } from "next";
import { Hackathons } from "@/ui/pages/hackathons/hackathons";
import page from "@/ui/pages/hackathons/hackathons.json";

/** Metadata for the hackathons listing. */
export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/hackathons" },
  openGraph: { title: page.title, description: page.description, url: "/hackathons" },
  twitter: { title: page.title, description: page.description },
};

/** Hackathons agenda page. */
export default function Page() {
  return <Hackathons />;
}
