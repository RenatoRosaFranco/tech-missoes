import { Breadcrumb } from "@/ui/componentes/breadcrumb/breadcrumb";
import { LazyChat } from "@/ui/componentes/chat/lazy-chat";
import { Community } from "@/ui/componentes/community/community";
import { Footer } from "@/ui/componentes/footer/footer";
import { Header } from "@/ui/componentes/header/header";
import { Hero } from "@/ui/componentes/hero/hero";
import { How } from "@/ui/componentes/how/how";
import { Join } from "@/ui/componentes/join/join";
import { LocationBar } from "@/ui/componentes/location-bar/location-bar";
import { Membership } from "@/ui/componentes/membership/membership";
import { Principles } from "@/ui/componentes/principles/principles";
import { StarterKit } from "@/ui/componentes/starter-kit/starter-kit";
import { LazyTechnologies } from "@/ui/componentes/technologies/lazy-technologies";
import { TypedLine } from "@/ui/componentes/typed-line/typed-line";
import { Areas } from "@/ui/componentes/areas/areas";
import { enabled, showPartnersSection, type FeatureName } from "@/ui/site/site";
import { LazyPageMotion } from "./lazy-page-motion";
import home from "./home.json";

export async function HomePage() {
  const Partners = showPartnersSection ? (await import("@/ui/componentes/partners/partners")).Partners : null;
  const sections = enabled(home.sections as { id: string; label: string; feature?: FeatureName }[]);

  return (
    <>
      <LazyPageMotion />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <LocationBar trailing={<TypedLine strings={home.locationTyped} typeSpeed={28} />} trailingHidden />
      <div className="site-header">
        <Header />
        <Breadcrumb sections={sections} />
      </div>
      <main id="conteudo">
        <Hero />
        <Principles />
        <Areas />
        <LazyTechnologies />
        <Community />
        {Partners ? <Partners /> : null}
        <How />
        <Join />
        <Membership />
        <StarterKit />
      </main>
      <Footer href="/" typed />
      <LazyChat />
    </>
  );
}
