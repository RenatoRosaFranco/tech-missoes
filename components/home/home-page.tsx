import { Breadcrumb } from "@/components/layout/breadcrumb";
import { LocationBar } from "@/components/layout/location-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { LazyChat } from "@/components/chat/lazy-chat";
import { LazyPageMotion } from "@/components/home/lazy-page-motion";
import { LazyTechnologies } from "@/components/home/lazy-technologies";
import { Areas, Community, Hero, HomeFooter, How, Join, Membership, Principles } from "@/components/home/sections";
import { StarterKit } from "@/components/home/starter-kit";
import { TypedLine } from "@/components/ui/typed-line";
import {
  homeCopy,
  homeSections,
  homeTyped,
  locationBarLabel,
  navCta,
  navLinks,
  showPartnersSection,
  suggestedQuestions,
  techMobilePositions,
  technologies,
  welcomeMessage,
} from "@/lib/app-config";

export async function HomePage() {
  const Partners = showPartnersSection ? (await import("./partners")).Partners : null;

  return (
    <>
      <LazyPageMotion />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <LocationBar place={locationBarLabel} trailing={<TypedLine strings={homeTyped.location} typeSpeed={28} />} trailingHidden />
      <div className="site-header">
        <SiteHeader links={navLinks} cta={navCta} />
        <Breadcrumb sections={homeSections} />
      </div>
      <main id="conteudo">
        <Hero />
        <Principles />
        <Areas />
        <LazyTechnologies technologies={technologies} mobilePositions={techMobilePositions} aroundTyped={homeTyped.around} copy={homeCopy.technologies} />
        <Community />
        {Partners ? <Partners /> : null}
        <How />
        <Join />
        <Membership />
        <StarterKit />
      </main>
      <HomeFooter />
      <LazyChat welcome={welcomeMessage} questions={suggestedQuestions} />
    </>
  );
}
