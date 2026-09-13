/**
 * Events agenda route (`/eventos`).
 *
 * @packageDocumentation
 */

import type { Metadata } from "next";
import { Eventos } from "@/ui/paginas/eventos/eventos";
import page from "@/ui/paginas/eventos/eventos.json";

/** Metadata for the community events listing. */
export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/eventos" },
  openGraph: { title: page.title, description: page.description, url: "/eventos" },
  twitter: { title: page.title, description: page.description },
};

/** Events agenda page. */
export default function Page() {
  return <Eventos />;
}
