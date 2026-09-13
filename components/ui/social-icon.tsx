import type { ReactNode } from "react";

export const socialNames = ["Facebook", "Instagram", "YouTube", "TikTok", "WhatsApp"] as const;
export type SocialName = (typeof socialNames)[number];

const glyphs: Record<SocialName, ReactNode> = {
  Facebook: <path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8" />,
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" />
    </>
  ),
  TikTok: <path d="M14 3v12a4 4 0 1 1-4-4v3a1 1 0 1 0 1 1V3h3c.5 3 2 4 5 4v3c-2 0-4-1-5-2" />,
  WhatsApp: (
    <>
      <path d="M21 11.5a9 9 0 0 1-13.4 7.8L3 21l1.6-4.6A9 9 0 1 1 21 11.5Z" />
      <path d="m8 7-1 2c1 4 3 6 7 7l2-1-2-3-2 1-2-2 1-2z" />
    </>
  ),
};

export function SocialIcon({ name }: { name: SocialName }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {glyphs[name]}
    </svg>
  );
}

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function HomeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="m3 11 9-8 9 8M5 9v12h5v-7h4v7h5V9" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3l18 18M10.6 10.6A3 3 0 0 0 13.4 13.4M9.9 5.1A10.8 10.8 0 0 1 12 5c6 0 10 7 10 7a18.5 18.5 0 0 1-3.2 3.8M6.1 6.1A18 18 0 0 0 2 12s4 7 10 7a10.3 10.3 0 0 0 4.2-.9" />
    </svg>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
