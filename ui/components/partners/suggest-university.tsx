"use client";

import { FormEvent, type MouseEvent, useEffect, useId, useRef, useState } from "react";
import { CloseIcon } from "@/ui/components/social-icon/social-icon";

type Field = {
  university: string;
  website: string;
  name: string;
  email: string;
};

const empty: Field = { university: "", website: "", name: "", email: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldErrors(fields: Field) {
  const university = fields.university.trim();
  const website = fields.website.trim();
  const name = fields.name.trim();
  const email = fields.email.trim();
  return {
    university: university.length < 2 ? "Digite o nome da universidade." : "",
    website: website ? "" : "Digite o website da instituição.",
    name: name.length < 2 ? "Digite o nome de quem está indicando." : "",
    email: emailPattern.test(email) ? "" : "Digite um e-mail válido.",
  };
}

export function SuggestUniversity() {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [fields, setFields] = useState<Field>(empty);
  const [errors, setErrors] = useState<Field>(empty);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add("indicate-open");
      dialog.querySelector<HTMLInputElement>("input")?.focus();
    }
    if (!open && dialog.open) dialog.close();
    if (!open) document.documentElement.classList.remove("indicate-open");
    return () => document.documentElement.classList.remove("indicate-open");
  }, [open]);

  function close() {
    setOpen(false);
    setPending(false);
    setError("");
    setErrors(empty);
    queueMicrotask(() => triggerRef.current?.focus());
  }

  function onClosed() {
    setOpen(false);
    setPending(false);
    setError("");
    setErrors(empty);
  }

  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const box = dialog.getBoundingClientRect();
    const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
    if (!inside) close();
  }

  function update<Key extends keyof Field>(key: Key, value: string) {
    setFields(current => ({ ...current, [key]: value }));
    setErrors(current => (current[key] ? { ...current, [key]: "" } : current));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const nextErrors = fieldErrors(fields);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as (keyof Field)[]).find(key => nextErrors[key]);
    if (firstInvalid) {
      document.getElementById(`indicate-${firstInvalid}`)?.focus();
      return;
    }
    const university = fields.university.trim();
    const website = fields.website.trim();
    const name = fields.name.trim();
    const email = fields.email.trim();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/indicate-university", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ university, website, name, email }),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) {
        setError(payload.error || "Não foi possível enviar agora. Tente de novo em instantes.");
        return;
      }
      setSent(true);
      setFields(empty);
      setErrors(empty);
    } catch {
      setError("Não foi possível enviar agora. Tente de novo em instantes.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="partners-cta">
      <p>Sua instituição ainda não aparece aqui?</p>
      <button
        ref={triggerRef}
        type="button"
        className="button button-red"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setSent(false);
          setError("");
          setErrors(empty);
          setOpen(true);
        }}
      >
        Indique sua universidade <span aria-hidden="true">↗</span>
      </button>
      <dialog
        ref={dialogRef}
        className="indicate-dialog"
        aria-labelledby={titleId}
        onClose={onClosed}
        onClick={onDialogClick}
      >
        {sent ? (
          <div className="indicate-card">
            <header className="indicate-head">
              <span className="eyebrow">INDICAÇÃO RECEBIDA</span>
              <h3 id={titleId}>Obrigado por indicar.</h3>
              <button type="button" className="indicate-close" onClick={close} aria-label="Fechar">
                <CloseIcon />
              </button>
            </header>
            <p className="indicate-lead">Vamos avaliar e, se fizer sentido para a Rota das Missões e o noroeste, a instituição entra nesta seção.</p>
            <button type="button" className="button button-red indicate-submit" onClick={close}>Fechar</button>
          </div>
        ) : (
          <form className="indicate-card" onSubmit={onSubmit} noValidate>
            <header className="indicate-head">
              <span className="eyebrow">INSTITUIÇÕES PARCEIRAS</span>
              <h3 id={titleId}>Indique sua universidade</h3>
              <button type="button" className="indicate-close" onClick={close} aria-label="Fechar">
                <CloseIcon />
              </button>
            </header>
            <p className="indicate-lead">Universidade, site e quem faz a&nbsp;indicação.</p>
            <div className="indicate-stack">
              <Field
                id="indicate-university"
                label="Universidade"
                value={fields.university}
                error={errors.university}
                onChange={university => update("university", university)}
                placeholder="Nome da instituição"
                autoComplete="organization"
              />
              <Field
                id="indicate-website"
                label="Website"
                type="url"
                value={fields.website}
                error={errors.website}
                onChange={website => update("website", website)}
                placeholder="https://"
                autoComplete="url"
              />
              <Field
                id="indicate-name"
                label="Nome de quem está indicando"
                value={fields.name}
                error={errors.name}
                onChange={name => update("name", name)}
                placeholder="Seu nome"
                autoComplete="name"
              />
              <Field
                id="indicate-email"
                label="E-mail"
                type="email"
                value={fields.email}
                error={errors.email}
                onChange={email => update("email", email)}
                placeholder="voce@email.com"
                autoComplete="email"
              />
            </div>
            {error && <p className="indicate-error" role="alert">{error}</p>}
            <button className="button button-red indicate-submit" type="submit" disabled={pending}>
              {pending ? "Enviando…" : "Enviar indicação"} <span aria-hidden="true">↗</span>
            </button>
          </form>
        )}
      </dialog>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  const invalid = Boolean(error);
  return (
    <div className="indicate-item">
      <label htmlFor={id}>{label}</label>
      <div className={`indicate-field${invalid ? " invalid" : ""}`}>
        <input
          id={id}
          type={type}
          name={id}
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${id}-error` : undefined}
          required
        />
      </div>
      {invalid && <p className="indicate-field-error" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  );
}

