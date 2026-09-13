import { Lines } from "@/ui/components/lines/lines";
import { SectionHeading } from "@/ui/components/section-heading/section-heading";
import { TrackCards } from "@/ui/components/tracks/tracks";
import { TypedLine } from "@/ui/components/typed-line/typed-line";
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
