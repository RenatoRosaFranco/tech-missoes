import { Brand } from "@/ui/components/brand/brand";
import { SocialIcon } from "@/ui/components/social-icon/social-icon";
import { TypedLine } from "@/ui/components/typed-line/typed-line";
import { socialProfiles } from "@/ui/site/site";
import copy from "./footer.json";
import "./footer.scss";

export function Footer({
  href = "/",
  line,
  typed,
}: {
  href?: string;
  line?: string;
  typed?: boolean;
}) {
  return (
    <footer className="container footer">
      <Brand href={href} label="Tech Missões, voltar ao início" />
      <p>{typed ? <TypedLine inView strings={copy.typed} /> : line}</p>
      {typed ? (
        <nav className="social-links" aria-label="Redes sociais da Tech Missões">
          {socialProfiles.map(profile => (
            profile.href ? (
              <a
                key={profile.name}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                title={profile.name}
                aria-label={`${profile.name} da Tech Missões (abre em nova aba)`}
              >
                <SocialIcon name={profile.name} />
              </a>
            ) : (
              <button
                type="button"
                className="social-pending"
                key={profile.name}
                aria-disabled="true"
                aria-label={`${profile.name}: em breve`}
                title={`${profile.name} — em breve`}
              >
                <SocialIcon name={profile.name} />
              </button>
            )
          ))}
        </nav>
      ) : null}
      <div>
        <address>{copy.address}</address>
        <span>TECH MISSÕES © {new Date().getFullYear()}</span>
        <a href={href}>{copy.credit} <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
