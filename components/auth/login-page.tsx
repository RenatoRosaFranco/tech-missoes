"use client";

import { FormEvent, useState } from "react";
import { Brand } from "@/components/ui/brand";
import { EyeIcon, EyeOffIcon, MailIcon } from "@/components/ui/social-icon";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function LoginPage({ whatsapp }: { whatsapp: string }) {
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
        <Brand className="login-aside-brand" href="/" label="Tech Missões, voltar ao início" />
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
                <MailIcon className="login-field-icon" />
                <input id="login-email" type="email" name="email" autoComplete="email" placeholder="voce@email.com" />
              </div>
            </div>
            <div className="login-item">
              <label htmlFor="login-password">Senha</label>
              <div className="login-field">
                <input id="login-password" type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" placeholder="Sua senha" />
                <button type="button" className="login-reveal" onClick={() => setShowPassword(current => !current)} aria-pressed={showPassword} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
          </div>
          {error && <p className="login-error" role="alert">{error}</p>}
          {notice && <p className="login-notice" role="status">{notice}</p>}
          <button className="login-submit button button-red" type="submit">Entrar <span aria-hidden="true">→</span></button>
          <footer className="login-card-foot">
            <p className="login-help">Ainda não faz parte? {whatsapp ? <a href={whatsapp} target="_blank" rel="noopener noreferrer">Entre no grupo do WhatsApp</a> : <a href="/#faca-parte">Conheça o convite da comunidade</a>}.</p>
            <a className="login-back" href="/">Voltar ao início</a>
          </footer>
        </form>
      </section>
    </main>
  );
}
