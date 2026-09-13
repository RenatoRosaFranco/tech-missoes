import { Lines } from "@/ui/componentes/lines/lines";
import { TypedLine } from "@/ui/componentes/typed-line/typed-line";
import copy from "./community.json";
import "./community.css";

export function Community() {
  return (
    <section className="community" id="comunidade">
      <div className="container community-inner">
        <div>
          <span className="eyebrow">{copy.eyebrow}</span>
          <h2>{copy.title}<br />{copy.titleAfter} <em><TypedLine inView strings={copy.typed} /></em></h2>
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
