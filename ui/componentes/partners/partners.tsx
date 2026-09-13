import type { ReactNode } from "react";
import { Lines } from "@/ui/componentes/lines/lines";
import { SectionHeading } from "@/ui/componentes/section-heading/section-heading";
import { TypedLine } from "@/ui/componentes/typed-line/typed-line";
import { SuggestUniversity } from "./suggest-university";
import copy from "./partners.json";
import "./partners.css";

export type Partner = (typeof copy.items)[number];
export const partners = copy.items;

const marks: Record<string, ReactNode> = {
  uffs: <><path d="M8 32h56" /><path d="m18 32 18-20 18 20" /><circle cx="36" cy="9" r="3" /></>,
  uri: <><circle cx="27" cy="24" r="13" /><circle cx="45" cy="24" r="13" /></>,
  unijui: <><path d="M10 14h52M10 24h52M10 34h52" /><path d="M20 14v20M52 14v20" /></>,
  setrem: <><path d="m36 6 22 32H14z" /><path d="M36 16v14M28 34h16" /></>,
  iffar: <><rect x="12" y="8" width="14" height="32" /><rect x="46" y="8" width="14" height="32" /><path d="M26 16h20M26 32h20" /></>,
  unipampa: <><path d="M6 34c8-10 14-10 22 0 8-12 16-12 24 0 5-7 10-7 14 0" /><path d="M6 38h60" /></>,
  fasa: <><path d="M16 40V22c0-12 20-16 20-16s20 4 20 16v18" /><path d="M16 40h40M36 12v28" /></>,
  uergs: <><path d="M36 6 62 21v17L36 42 10 38V21z" /><path d="M36 16v16M28 24h16" /></>,
  ufsm: <><circle cx="36" cy="24" r="8" /><path d="M36 6v8M36 34v8M6 24h8M58 24h8M14 10l6 6M52 32l6 6M58 10l-6 6M20 32l-6 6" /></>,
  unicruz: <><circle cx="36" cy="24" r="16" /><path d="M36 12v24M26 22h20" /></>,
};

function PartnerMark({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 72 48" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      {marks[id]}
    </svg>
  );
}

export function Partners() {
  return (
    <section className="section container partners" id="parceiras" aria-labelledby="partners-title">
      <SectionHeading
        eyebrow={copy.eyebrow}
        titleId="partners-title"
        title={<>{copy.title}<br /><em><TypedLine inView strings={copy.typed} /></em></>}
      >
        <Lines text={copy.lead} />
      </SectionHeading>
      <div className="partners-box" role="list">
        {partners.map(partner => (
          <a
            className="partner-cell"
            role="listitem"
            key={partner.id}
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${partner.name}. ${partner.full}. ${partner.place} (abre em nova aba)`}
          >
            <span className="partner-mark"><PartnerMark id={partner.id} /></span>
          </a>
        ))}
      </div>
      <SuggestUniversity />
    </section>
  );
}
