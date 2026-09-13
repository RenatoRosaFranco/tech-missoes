import type { ReactNode } from "react";
import { locationBarLabel } from "@/ui/site/site";
import "./location-bar.scss";

export function LocationBar({
  trailing,
  trailingHidden,
}: {
  trailing: ReactNode;
  trailingHidden?: boolean;
}) {
  return (
    <div className="location-bar">
      <div className="container">
        <span><span className="location-dot" />{locationBarLabel}</span>
        <span aria-hidden={trailingHidden || undefined}>{trailing}</span>
      </div>
    </div>
  );
}
