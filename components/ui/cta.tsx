import type { ReactNode } from "react";
import { Arrow } from "@/components/ui/social-icon";

export function RedCta({
  href,
  children,
  pending,
}: {
  href: string;
  children: ReactNode;
  pending?: ReactNode;
}) {
  if (href) {
    return (
      <a className="button button-red" href={href} target="_blank" rel="noopener noreferrer">
        {children} <Arrow />
      </a>
    );
  }

  return (
    <>
      <button className="button button-red" disabled>
        {children} <Arrow />
      </button>
      {pending}
    </>
  );
}
