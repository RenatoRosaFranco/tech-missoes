/**
 * Sign-in route (`/login`).
 *
 * Excluded from search indexing.
 *
 * @packageDocumentation
 */

import type { Metadata } from "next";
import { Login } from "@/ui/pages/login/login";
import copy from "@/ui/pages/login/login.json";

/** Noindex metadata for the login screen. */
export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  robots: { index: false, follow: false },
  alternates: { canonical: "/login" },
};

/** Community login page. */
export default function Page() {
  return <Login />;
}
