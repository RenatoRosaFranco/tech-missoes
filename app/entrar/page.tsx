import type { Metadata } from "next";
import { LoginPage } from "./login-page";

export const metadata: Metadata = {
  title: "Entrar — Tech Missões",
  description: "Acesse a área de membros da Tech Missões, a comunidade de estudo e desenvolvimento de Cerro Largo e da região das Missões.",
};

export default function Page() {
  return <LoginPage />;
}
