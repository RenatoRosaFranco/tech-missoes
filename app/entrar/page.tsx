/**
 * Sign-in route (`/entrar`).
 *
 * Excluded from search indexing.
 *
 * @packageDocumentation
 */

import type { Metadata } from "next";
import { Entrar } from "@/ui/paginas/entrar/entrar";
import copy from "@/ui/paginas/entrar/entrar.json";

/** Noindex metadata for the login screen. */
export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  robots: { index: false, follow: false },
  alternates: { canonical: "/entrar" },
};

/** Community login page. */
export default function Page() {
  return <Entrar />;
}
