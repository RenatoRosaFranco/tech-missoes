import { Fragment } from "react";
import { MissionArt } from "@/components/home/mission-art";
import { TrackCards, TrackSelector } from "@/components/home/study-tracks";
import { Brand } from "@/components/ui/brand";
import { RedCta } from "@/components/ui/cta";
import { Lines } from "@/components/ui/lines";
import { SectionHeading } from "@/components/ui/section-heading";
import { Arrow, SocialIcon } from "@/components/ui/social-icon";
import { TypedLine } from "@/components/ui/typed-line";
import { communityLinks, homeCopy, homeTyped, howSteps, siteFooter, socialProfiles, studyTracks } from "@/lib/app-config";

export function Hero() {
  const copy = homeCopy.hero;
  return (
    <section className="hero container" id="inicio">
      <div className="hero-copy">
        <div className="eyebrow"><span className="red-line" /> {copy.eyebrow}</div>
        <h1>
          <span className="hero-title-line"><em>{copy.titleLead}</em> {copy.titleRest}</span>
          <br />
          <span className="sr-only">{copy.srOnly}</span>
          <span className="hero-typed" aria-hidden="true"><TypedLine strings={homeTyped.hero} /></span>
        </h1>
        <p>{copy.lead}</p>
        <div className="hero-actions">
          <a className="button button-red" href={copy.primaryHref}>{copy.primaryCta} <Arrow /></a>
          <a className="text-link" href={copy.secondaryHref}>{copy.secondaryCta} <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-footnote"><span className="small-cross">+</span> {copy.footnote}</div>
      </div>
      <MissionArt />
    </section>
  );
}

export function Principles() {
  const copy = homeCopy.principles;
  return (
    <div className="principles container">
      <span>{copy.kicker}<br /><strong>{copy.emphasis}</strong></span>
      {copy.items.map((item, index) => (
        <Fragment key={item}>
          {index ? <span className="principle-star">✳</span> : null}
          <p><TypedLine inView loop={false} strings={[item]} /></p>
        </Fragment>
      ))}
    </div>
  );
}

export function Areas() {
  const copy = homeCopy.areas;
  return (
    <section className="areas section container" id="areas">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={<>{copy.title}<br /><TypedLine inView strings={homeTyped.areas} /></>}
      >
        <Lines text={copy.lead} />
      </SectionHeading>
      <TrackCards tracks={studyTracks} />
    </section>
  );
}

export function Community() {
  const copy = homeCopy.community;
  return (
    <section className="community" id="comunidade">
      <div className="container community-inner">
        <div>
          <span className="eyebrow">{copy.eyebrow}</span>
          <h2>{copy.title}<br />{copy.titleAfter} <em><TypedLine inView strings={homeTyped.community} /></em></h2>
        </div>
        <div>
          <p className="community-lead"><Lines text={copy.lead} /></p>
          {copy.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <span className="community-location"><span className="location-dot" /> {copy.location}</span>
        </div>
      </div>
    </section>
  );
}

export function How() {
  const copy = homeCopy.how;
  return (
    <section className="section container how" id="como-funciona">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={<TypedLine inView loop={false} strings={homeTyped.how} />}
      >
        <Lines text={copy.lead} />
      </SectionHeading>
      <div className="how-grid">
        {howSteps.map((step, index) => (
          <div className="how-step" key={step.title}>
            <span className="step-number">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Join() {
  const copy = homeCopy.join;
  return (
    <section className="join container" id="participe">
      <div className="join-copy">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2>{copy.title}<br /><TypedLine inView strings={homeTyped.join} /></h2>
        <p>{copy.lead}</p>
        <span className="join-note">{copy.note}</span>
      </div>
      <TrackSelector tracks={studyTracks} />
    </section>
  );
}

export function Membership() {
  const copy = homeCopy.membership;
  return (
    <section className="membership container" id="faca-parte" aria-labelledby="membership-title">
      <div className="membership-copy">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2 id="membership-title">{copy.title}<br /><em><TypedLine inView strings={homeTyped.membership} /></em></h2>
        <p>{copy.lead}</p>
      </div>
      <div className="membership-invite">
        <span className="whatsapp-icon"><SocialIcon name="WhatsApp" /></span>
        <h3>{copy.inviteTitle}</h3>
        <p>{copy.inviteText}</p>
        <RedCta
          href={communityLinks.whatsapp}
          pending={<p className="membership-pending">{copy.pending}</p>}
        >
          {copy.cta}
        </RedCta>
        <span className="membership-caption"><TypedLine inView strings={homeTyped.caption} typeSpeed={24} /></span>
      </div>
    </section>
  );
}

export function HomeFooter() {
  return (
    <footer className="container footer">
      <Brand href="#inicio" label="Tech Missões, voltar ao início" />
      <p><TypedLine inView strings={homeTyped.footer} /></p>
      <nav className="social-links" aria-label="Redes sociais da Tech Missões">
        {socialProfiles.map(profile => (
          profile.href ? (
            <a
              key={profile.name}
              href={profile.href}
              target="_blank"
              rel="noopener noreferrer"
              title={profile.name}
              aria-label={`${profile.name} da Tech Missões (abre em nova aba)`}
            >
              <SocialIcon name={profile.name} />
            </a>
          ) : (
            <button
              type="button"
              className="social-pending"
              key={profile.name}
              aria-disabled="true"
              aria-label={`${profile.name}: em breve`}
              title={`${profile.name} — em breve`}
            >
              <SocialIcon name={profile.name} />
            </button>
          )
        ))}
      </nav>
      <div>
        <address>{siteFooter.address}</address>
        <span>TECH MISSÕES © {new Date().getFullYear()}</span>
        <a href="#inicio">{siteFooter.credit} <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
