import { Breadcrumb } from "@/ui/components/breadcrumb/breadcrumb";
import { LazyChat } from "@/ui/components/chat/lazy-chat";
import { Community } from "@/ui/components/community/community";
import { Footer } from "@/ui/components/footer/footer";
import { Header } from "@/ui/components/header/header";
import { Hero } from "@/ui/components/hero/hero";
import { How } from "@/ui/components/how/how";
import { Join } from "@/ui/components/join/join";
import { LocationBar } from "@/ui/components/location-bar/location-bar";
import { Membership } from "@/ui/components/membership/membership";
import { Principles } from "@/ui/components/principles/principles";
import { StarterKit } from "@/ui/components/starter-kit/starter-kit";
import { LazyTechnologies } from "@/ui/components/technologies/lazy-technologies";
import { TypedLine } from "@/ui/components/typed-line/typed-line";
import { Areas } from "@/ui/components/areas/areas";
import { enabled, showPartnersSection, type FeatureName } from "@/ui/site/site";
import { LazyPageMotion } from "./lazy-page-motion";
import home from "./home.json";

export async function HomePage() {
  const Partners = showPartnersSection ? (await import("@/ui/components/partners/partners")).Partners : null;
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
