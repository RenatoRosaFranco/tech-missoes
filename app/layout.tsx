import type { Metadata } from "next";
import { ThemeBoot } from "./theme-boot";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Missões — Conhecimento que conecta",
  description: "Comunidade de estudo e desenvolvimento em Cerro Largo e na região das Missões. Engenharia de software, inteligência artificial e robótica para construir o futuro juntos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeBoot />
        {children}
      </body>
    </html>
  );
}
