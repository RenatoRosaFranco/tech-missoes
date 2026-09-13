import { HomeIcon } from "@/ui/componentes/social-icon/social-icon";
import "./page-trail.css";

type TrailItem = { label: string; href: string };

export function PageTrail({
  current,
  href,
  parent,
}: {
  current: string;
  href: string;
  parent?: TrailItem;
}) {
  const items: TrailItem[] = [
    { label: "Início", href: "/" },
    ...(parent ? [parent] : []),
    { label: current, href },
  ];

  return (
    <nav className="breadcrumb-bar" aria-label="Localização na página">
      <ol className="container breadcrumb-list">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href} className={last ? "breadcrumb-current" : undefined}>
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              <a href={item.href} aria-current={last ? "page" : undefined}>
                {index === 0 ? <HomeIcon /> : null}
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
