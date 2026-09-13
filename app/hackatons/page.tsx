/**
 * Hackathons agenda route (`/hackatons`).
 *
 * @packageDocumentation
 */

import type { Metadata } from "next";
import { Hackatons } from "@/ui/paginas/hackatons/hackatons";
import page from "@/ui/paginas/hackatons/hackatons.json";

/** Metadata for the hackathons listing. */
export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/hackatons" },
  openGraph: { title: page.title, description: page.description, url: "/hackatons" },
  twitter: { title: page.title, description: page.description },
};

/** Hackathons agenda page. */
export default function Page() {
  return <Hackatons />;
}
