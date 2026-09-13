import type { ReactNode } from "react";

export function LocationBar({
  place,
  trailing,
  trailingHidden,
}: {
  place: string;
  trailing: ReactNode;
  trailingHidden?: boolean;
}) {
  return (
    <div className="location-bar">
      <div className="container">
        <span><span className="location-dot" />{place}</span>
        <span aria-hidden={trailingHidden || undefined}>{trailing}</span>
      </div>
    </div>
  );
}
