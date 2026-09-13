import type { ReactNode } from "react";
import { PageTrail } from "./page-trail";
import { SiteHeader } from "./site-header";
import { LocationBar } from "./location-bar";
import { Brand } from "@/components/ui/brand";
import { locationBarLabel, navCta, navLinks, siteFooter } from "@/lib/app-config";

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
      <LocationBar place={locationBarLabel} trailing={location} />
      <div className="site-header">
        <SiteHeader links={navLinks} cta={navCta} />
        <PageTrail {...trail} />
      </div>
      <main id="conteudo">{children}</main>
      <footer className="container footer">
        <Brand href="/" label="Tech Missões, voltar ao início" />
        <p>{footerLine}</p>
        <div>
          <address>{siteFooter.address}</address>
          <span>TECH MISSÕES © {new Date().getFullYear()}</span>
          <a href="/">{siteFooter.credit} <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}
