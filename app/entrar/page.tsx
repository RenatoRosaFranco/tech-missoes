import type { Metadata } from "next";
import { LoginPage } from "@/components/auth/login-page";
import { communityLinks } from "@/lib/app-config";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse a área de membros da Tech Missões, a comunidade de estudo e desenvolvimento de Cerro Largo e da região das Missões.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/entrar" },
};

export default function Page() {
  return <LoginPage whatsapp={communityLinks.whatsapp} />;
}
