"use client";

import { FormEvent, useState } from "react";
import { communityLinks } from "../community-links";
import { ThemeToggle } from "../theme-toggle";

function Mark() {
  return <svg viewBox="0 0 46 42" fill="currentColor" aria-hidden="true"><path d="M0 0h27v8h-9v34H9V8H0zM23 13h8v29h-8zM35 0h9v42h-9z" /></svg>;
}

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    setNotice("");
    if (!email || !password) {
      setError("Preencha o e-mail e a senha para entrar.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Digite um e-mail válido.");
      return;
    }
    setError("");
    setNotice("A área de membros ainda está sendo preparada. Enquanto isso, a conversa da comunidade continua no WhatsApp.");
  }

  return (
    <main className="login-screen" id="entrar">
      <a className="skip-link" href="#login-form">Pular para o formulário</a>
      <aside className="login-aside">
        <a className="brand login-aside-brand" href="/" aria-label="Tech Missões, voltar ao início"><Mark /><span>tech<span>missões<span className="brand-period">.</span></span></span></a>
        <div className="login-aside-copy">
          <span className="eyebrow">TECH MISSÕES · RS</span>
          <p className="login-aside-title"><em>Juntos,</em> construímos o futuro.</p>
          <p>Uma comunidade de estudo e desenvolvimento que conecta pessoas para aprender, criar e transformar a nossa região.</p>
        </div>
      </aside>
      <section className="login-panel">
        <div className="login-panel-bar">
          <ThemeToggle />
        </div>
        <form id="login-form" className="login-card" onSubmit={onSubmit} noValidate>
          <header className="login-card-head">
            <div className="eyebrow"><span className="red-line" /> ACESSO</div>
            <h1>Entrar <em>na comunidade.</em></h1>
            <p>E-mail e senha de quem já faz parte da Tech Missões.</p>
          </header>
          <div className="login-stack">
            <div className="login-item">
              <label htmlFor="login-email">E-mail</label>
              <div className="login-field">
                <svg className="login-field-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
                <input id="login-email" type="email" name="email" autoComplete="email" placeholder="voce@email.com" />
              </div>
            </div>
            <div className="login-item">
              <label htmlFor="login-password">Senha</label>
              <div className="login-field">
                <input id="login-password" type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" placeholder="Sua senha" />
                <button type="button" className="login-reveal" onClick={() => setShowPassword(current => !current)} aria-pressed={showPassword} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
                  {showPassword
                    ? <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6A3 3 0 0 0 13.4 13.4M9.9 5.1A10.8 10.8 0 0 1 12 5c6 0 10 7 10 7a18.5 18.5 0 0 1-3.2 3.8M6.1 6.1A18 18 0 0 0 2 12s4 7 10 7a10.3 10.3 0 0 0 4.2-.9" /></svg>
                    : <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>}
                </button>
              </div>
            </div>
          </div>
          {error && <p className="login-error" role="alert">{error}</p>}
          {notice && <p className="login-notice" role="status">{notice}</p>}
          <button className="login-submit button button-red" type="submit">Entrar <span aria-hidden="true">→</span></button>
          <footer className="login-card-foot">
            <p className="login-help">Ainda não faz parte? {communityLinks.whatsapp ? <a href={communityLinks.whatsapp} target="_blank" rel="noopener noreferrer">Entre no grupo do WhatsApp</a> : <a href="/#faca-parte">Conheça o convite da comunidade</a>}.</p>
            <a className="login-back" href="/">Voltar ao início</a>
          </footer>
        </form>
      </section>
    </main>
  );
}
