import type { ReactNode } from "react";
import { Footer } from "@/ui/componentes/footer/footer";
import { Header } from "@/ui/componentes/header/header";
import { LocationBar } from "@/ui/componentes/location-bar/location-bar";
import { PageTrail } from "@/ui/componentes/page-trail/page-trail";

export function SitePage({
  location,
  trail,
  footerLine,
  children,
}: {
  location: string;
  trail: { current: string; href: string; parent?: { label: string; href: string } };
  footerLine: string;
  children: ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <LocationBar trailing={location} />
      <div className="site-header">
        <Header />
        <PageTrail {...trail} />
      </div>
      <main id="conteudo">{children}</main>
      <Footer href="/" line={footerLine} />
    </>
  );
}
