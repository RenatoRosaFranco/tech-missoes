"use client";

import { FormEvent, useState } from "react";
import { Brand } from "@/ui/componentes/brand/brand";
import { EyeIcon, EyeOffIcon, MailIcon } from "@/ui/componentes/social-icon/social-icon";
import { ThemeToggle } from "@/ui/componentes/theme-toggle/theme-toggle";
import { communityLinks } from "@/ui/site/site";
import copy from "./entrar.json";
import "./entrar.css";

export function Entrar() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const whatsapp = communityLinks.whatsapp;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    setNotice("");
    if (!email || !password) {
      setError(copy.emptyError);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(copy.invalidEmail);
      return;
    }
    setError("");
    setNotice(copy.pendingNotice);
  }

  return (
    <main className="login-screen" id="entrar">
      <a className="skip-link" href="#login-form">{copy.skip}</a>
      <aside className="login-aside">
        <Brand className="login-aside-brand" href="/" label="Tech Missões, voltar ao início" />
        <div className="login-aside-copy">
          <span className="eyebrow">{copy.asideEyebrow}</span>
          <p className="login-aside-title"><em>{copy.asideTitleLead}</em> {copy.asideTitleRest}</p>
          <p>{copy.asideLead}</p>
        </div>
      </aside>
      <section className="login-panel">
        <div className="login-panel-bar">
          <ThemeToggle />
        </div>
        <form id="login-form" className="login-card" onSubmit={onSubmit} noValidate>
          <header className="login-card-head">
            <div className="eyebrow"><span className="red-line" /> {copy.eyebrow}</div>
            <h1>{copy.heading} <em>{copy.headingEm}</em></h1>
            <p>{copy.lead}</p>
          </header>
          <div className="login-stack">
            <div className="login-item">
              <label htmlFor="login-email">{copy.emailLabel}</label>
              <div className="login-field">
                <MailIcon className="login-field-icon" />
                <input id="login-email" type="email" name="email" autoComplete="email" placeholder={copy.emailPlaceholder} />
              </div>
            </div>
            <div className="login-item">
              <label htmlFor="login-password">{copy.passwordLabel}</label>
              <div className="login-field">
                <input id="login-password" type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" placeholder={copy.passwordPlaceholder} />
                <button type="button" className="login-reveal" onClick={() => setShowPassword(current => !current)} aria-pressed={showPassword} aria-label={showPassword ? copy.hidePassword : copy.showPassword}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
          </div>
          {error && <p className="login-error" role="alert">{error}</p>}
          {notice && <p className="login-notice" role="status">{notice}</p>}
          <button className="login-submit button button-red" type="submit">{copy.submit} <span aria-hidden="true">→</span></button>
          <footer className="login-card-foot">
            <p className="login-help">{copy.helpPrefix} {whatsapp ? <a href={whatsapp} target="_blank" rel="noopener noreferrer">{copy.whatsappCta}</a> : <a href="/#faca-parte">{copy.inviteCta}</a>}.</p>
            <a className="login-back" href="/">{copy.back}</a>
          </footer>
        </form>
      </section>
    </main>
  );
}
