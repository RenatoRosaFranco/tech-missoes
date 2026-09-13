import "./brand.css";

type BrandProps = {
  href: string;
  label: string;
  className?: string;
};

export function BrandMark() {
  return (
    <svg viewBox="0 0 46 42" fill="currentColor" aria-hidden="true">
      <path d="M0 0h27v8h-9v34H9V8H0zM23 13h8v29h-8zM35 0h9v42h-9z" />
    </svg>
  );
}

export function Brand({ href, label, className }: BrandProps) {
  return (
    <a className={className ? `brand ${className}` : "brand"} href={href} aria-label={label}>
      <BrandMark />
      <span>tech<span>missões<span className="brand-period">.</span></span></span>
    </a>
  );
}
