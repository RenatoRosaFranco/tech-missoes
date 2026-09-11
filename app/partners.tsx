import { SuggestUniversity } from "./suggest-university";
import { TypedLine } from "./typed-line";

const partnersTyped = ["universidades da região.", "instituições das Missões.", "faculdades do noroeste."];

const partners = [
  {
    id: "uffs",
    name: "UFFS",
    full: "Universidade Federal da Fronteira Sul",
    place: "Campus Cerro Largo",
    href: "https://www.uffs.edu.br/",
  },
  {
    id: "uri",
    name: "URI",
    full: "Universidade Regional Integrada do Alto Uruguai e das Missões",
    place: "Santo Ângelo, São Luiz Gonzaga e Cerro Largo",
    href: "https://www.uri.br/",
  },
  {
    id: "unijui",
    name: "UNIJUÍ",
    full: "Universidade Regional do Noroeste do Estado do Rio Grande do Sul",
    place: "Ijuí",
    href: "https://www.unijui.edu.br/",
  },
  {
    id: "setrem",
    name: "SETREM",
    full: "Sociedade Educacional Três de Maio",
    place: "Três de Maio",
    href: "https://www.setrem.com.br/",
  },
  {
    id: "iffar",
    name: "IFFar",
    full: "Instituto Federal Farroupilha",
    place: "Santo Ângelo e rede federal",
    href: "https://www.iffarroupilha.edu.br/",
  },
  {
    id: "unipampa",
    name: "UNIPAMPA",
    full: "Universidade Federal do Pampa",
    place: "São Borja e demais campi",
    href: "https://unipampa.edu.br/",
  },
  {
    id: "fasa",
    name: "FASA",
    full: "Faculdade Santo Ângelo",
    place: "Santo Ângelo",
    href: "https://sejafasa.com/",
  },
  {
    id: "uergs",
    name: "UERGS",
    full: "Universidade Estadual do Rio Grande do Sul",
    place: "Unidade São Luiz Gonzaga",
    href: "https://www.uergs.edu.br/",
  },
  {
    id: "ufsm",
    name: "UFSM",
    full: "Universidade Federal de Santa Maria",
    place: "Campus Palmeira das Missões",
    href: "https://www.ufsm.br/unidades-universitarias/palmeira-das-missoes/",
  },
  {
    id: "unicruz",
    name: "UNICRUZ",
    full: "Universidade de Cruz Alta",
    place: "Cruz Alta",
    href: "https://www.unicruz.edu.br/",
  },
] as const;

function PartnerMark({ id }: { id: (typeof partners)[number]["id"] }) {
  return (
    <svg viewBox="0 0 72 48" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      {id === "uffs" && (
        <>
          <path d="M8 32h56" />
          <path d="m18 32 18-20 18 20" />
          <circle cx="36" cy="9" r="3" />
        </>
      )}
      {id === "uri" && (
        <>
          <circle cx="27" cy="24" r="13" />
          <circle cx="45" cy="24" r="13" />
        </>
      )}
      {id === "unijui" && (
        <>
          <path d="M10 14h52M10 24h52M10 34h52" />
          <path d="M20 14v20M52 14v20" />
        </>
      )}
      {id === "setrem" && (
        <>
          <path d="m36 6 22 32H14z" />
          <path d="M36 16v14M28 34h16" />
        </>
      )}
      {id === "iffar" && (
        <>
          <rect x="12" y="8" width="14" height="32" />
          <rect x="46" y="8" width="14" height="32" />
          <path d="M26 16h20M26 32h20" />
        </>
      )}
      {id === "unipampa" && (
        <>
          <path d="M6 34c8-10 14-10 22 0 8-12 16-12 24 0 5-7 10-7 14 0" />
          <path d="M6 38h60" />
        </>
      )}
      {id === "fasa" && (
        <>
          <path d="M16 40V22c0-12 20-16 20-16s20 4 20 16v18" />
          <path d="M16 40h40M36 12v28" />
        </>
      )}
      {id === "uergs" && (
        <>
          <path d="M36 6 62 21v17L36 42 10 38V21z" />
          <path d="M36 16v16M28 24h16" />
        </>
      )}
      {id === "ufsm" && (
        <>
          <circle cx="36" cy="24" r="8" />
          <path d="M36 6v8M36 34v8M6 24h8M58 24h8M14 10l6 6M52 32l6 6M58 10l-6 6M20 32l-6 6" />
        </>
      )}
      {id === "unicruz" && (
        <>
          <circle cx="36" cy="24" r="16" />
          <path d="M36 12v24M26 22h20" />
        </>
      )}
    </svg>
  );
}

export function Partners() {
  return (
    <section className="section container partners" id="parceiras" aria-labelledby="partners-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">04 / INSTITUIÇÕES PARCEIRAS</span>
          <h2 id="partners-title">Caminhamos com as<br /><em><TypedLine inView strings={partnersTyped} /></em></h2>
        </div>
        <p>Universidades e faculdades da Rota das Missões<br />e do noroeste, ao lado de quem estuda e constrói.</p>
      </div>
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
