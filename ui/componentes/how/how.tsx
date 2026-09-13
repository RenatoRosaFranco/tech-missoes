import { Lines } from "@/ui/componentes/lines/lines";
import { SectionHeading } from "@/ui/componentes/section-heading/section-heading";
import { TypedLine } from "@/ui/componentes/typed-line/typed-line";
import copy from "./how.json";
import "./how.css";

export function How() {
  return (
    <section className="section container how" id="como-funciona">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={<TypedLine inView loop={false} strings={copy.typed} />}
      >
        <Lines text={copy.lead} />
      </SectionHeading>
      <div className="how-grid">
        {copy.steps.map((step, index) => (
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
