"use client";

import { type ComponentType, useState } from "react";

function Mark() {
  return <svg viewBox="0 0 46 42" fill="currentColor" aria-hidden="true"><path d="M0 0h27v8h-9v34H9V8H0zM23 13h8v29h-8zM35 0h9v42h-9z" /></svg>;
}

export function LazyChat() {
  const [Chat, setChat] = useState<ComponentType<{ startOpen?: boolean }> | null>(null);

  if (Chat) return <Chat startOpen />;

  return (
    <div className="community-chat">
      <button
        type="button"
        className="chat-launcher"
        aria-label="Abrir guia da comunidade"
        onClick={() => {
          void import("./community-chat").then(mod => setChat(() => mod.CommunityChat));
        }}
      >
        <Mark />
      </button>
    </div>
  );
}
