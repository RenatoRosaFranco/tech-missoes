export function PageTrail({ current, href }: { current: string; href: string }) {
  return (
    <nav className="breadcrumb-bar" aria-label="Localização na página">
      <ol className="container breadcrumb-list">
        <li>
          <a href="/">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m3 11 9-8 9 8M5 9v12h5v-7h4v7h5V9" /></svg>
            Início
          </a>
        </li>
        <li className="breadcrumb-current">
          <span aria-hidden="true">/</span>
          <a href={href} aria-current="page">{current}</a>
        </li>
      </ol>
    </nav>
  );
}
