import { Fragment } from "react";
import { TypedLine } from "@/ui/components/typed-line/typed-line";
import copy from "./principles.json";
import "./principles.scss";

export function Principles() {
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
