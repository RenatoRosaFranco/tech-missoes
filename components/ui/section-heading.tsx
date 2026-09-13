import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  titleId,
  title,
  children,
  className,
}: {
  eyebrow: string;
  titleId?: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className ? `section-heading ${className}` : "section-heading"}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={titleId}>{title}</h2>
      </div>
      <p>{children}</p>
    </div>
  );
}
