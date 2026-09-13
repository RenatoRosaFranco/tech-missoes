import { MissionArt } from "@/ui/components/mission-art/mission-art";
import { Arrow } from "@/ui/components/social-icon/social-icon";
import { TypedLine } from "@/ui/components/typed-line/typed-line";
import copy from "./hero.json";
import "./hero.scss";

export function Hero() {
  return (
    <section className="hero container" id="inicio">
      <div className="hero-copy">
        <div className="eyebrow"><span className="red-line" /> {copy.eyebrow}</div>
        <h1>
          <span className="hero-title-line"><em>{copy.titleLead}</em> {copy.titleRest}</span>
          <br />
          <span className="sr-only">{copy.srOnly}</span>
          <span className="hero-typed" aria-hidden="true"><TypedLine strings={copy.typed} /></span>
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
