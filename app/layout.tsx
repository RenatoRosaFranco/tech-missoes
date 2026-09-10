import type { Metadata } from "next";
import Script from "next/script";
import { CommunityChat } from "./community-chat";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Missões — Conhecimento que conecta",
  description: "Comunidade de estudo e desenvolvimento em Cerro Largo e na região das Missões. Engenharia de software, inteligência artificial e robótica para construir o futuro juntos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {children}
        <CommunityChat />
        <Script id="theme-init" strategy="beforeInteractive">{`(function(){var theme;try{theme=localStorage.getItem('tech-missoes-theme')}catch(e){}document.documentElement.dataset.theme=theme==='dark'||theme==='light'?theme:window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})();`}</Script>
      </body>
    </html>
  );
}
