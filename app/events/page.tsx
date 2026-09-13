/**
 * Events agenda route (`/events`).
 *
 * @packageDocumentation
 */

import type { Metadata } from "next";
import { Events } from "@/ui/pages/events/events";
import page from "@/ui/pages/events/events.json";

/** Metadata for the community events listing. */
export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/events" },
  openGraph: { title: page.title, description: page.description, url: "/events" },
  twitter: { title: page.title, description: page.description },
};

/** Events agenda page. */
export default function Page() {
  return <Events />;
}
