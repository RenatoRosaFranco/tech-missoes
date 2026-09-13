import { TrackSelector } from "@/ui/components/tracks/tracks";
import { TypedLine } from "@/ui/components/typed-line/typed-line";
import copy from "./join.json";
import "./join.scss";

export function Join() {
  return (
    <section className="join container" id="participe">
      <div className="join-copy">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2>{copy.title}<br /><TypedLine inView strings={copy.typed} /></h2>
        <p>{copy.lead}</p>
        <span className="join-note">{copy.note}</span>
      </div>
      <TrackSelector />
    </section>
  );
}
