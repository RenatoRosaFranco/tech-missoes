import { Lines } from "@/ui/componentes/lines/lines";
import { SectionHeading } from "@/ui/componentes/section-heading/section-heading";
import { TrackCards } from "@/ui/componentes/trilhas/trilhas";
import { TypedLine } from "@/ui/componentes/typed-line/typed-line";
import copy from "./areas.json";

export function Areas() {
  return (
    <section className="areas section container" id="areas">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={<>{copy.title}<br /><TypedLine inView strings={copy.typed} /></>}
      >
        <Lines text={copy.lead} />
      </SectionHeading>
      <TrackCards />
    </section>
  );
}
