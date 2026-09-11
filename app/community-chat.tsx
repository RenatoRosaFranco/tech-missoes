"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { suggestedQuestions, welcomeMessage } from "@/lib/community-knowledge";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function Mark() {
  return <svg viewBox="0 0 46 42" fill="currentColor" aria-hidden="true"><path d="M0 0h27v8h-9v34H9V8H0zM23 13h8v29h-8zM35 0h9v42h-9z" /></svg>;
}

export function CommunityChat() {
  const panelId = useId();
  const inputId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: welcomeMessage }]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;
    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const payload = await response.json() as { reply?: string; error?: string };
      if (!response.ok || !payload.reply) throw new Error(payload.error || "unavailable");
      setMessages([...nextMessages, { role: "assistant", content: payload.reply }]);
    } catch {
      setError("Não consegui responder agora. Tente de novo em instantes.");
    } finally {
      setPending(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }

  return (
    <div className="community-chat">
      {open && (
        <section className="chat-panel" id={panelId} role="dialog" aria-modal="false" aria-labelledby="chat-title">
          <header className="chat-head">
            <div className="chat-brand"><Mark /><div><span className="chat-kicker">POSTO TM · 001</span><strong id="chat-title">Guia da comunidade</strong></div></div>
            <button type="button" className="chat-close" onClick={() => setOpen(false)} aria-label="Fechar conversa">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </header>
          <div className="chat-log" ref={listRef} aria-live="polite" aria-relevant="additions">
            {messages.map((message, index) => (
              <p className={`chat-bubble chat-${message.role}`} key={`${message.role}-${index}`}>{message.content}</p>
            ))}
            {pending && <p className="chat-bubble chat-assistant chat-pending" aria-label="O guia está respondendo"><span /><span /><span /></p>}
            {messages.length === 1 && !pending && (
              <div className="chat-suggestions">
                {suggestedQuestions.map(question => (
                  <button type="button" key={question} onClick={() => void send(question)}>{question}</button>
                ))}
              </div>
            )}
          </div>
          <form className="chat-form" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor={inputId}>Pergunte sobre a Tech Missões</label>
            <div className="chat-compose">
              <input id={inputId} ref={inputRef} type="text" maxLength={500} value={input} onChange={event => setInput(event.target.value)} placeholder="Pergunte sobre a comunidade" disabled={pending} autoComplete="off" />
              <button type="submit" className="chat-send" disabled={pending || !input.trim()}>Enviar</button>
            </div>
            {error && <p className="chat-error" role="alert">{error}</p>}
          </form>
        </section>
      )}
      <button
        type="button"
        className={`chat-launcher${open ? " open" : ""}`}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Fechar guia da comunidade" : "Abrir guia da comunidade"}
        onClick={() => setOpen(current => !current)}
      >
        <Mark />
      </button>
    </div>
  );
}
