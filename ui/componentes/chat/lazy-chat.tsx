"use client";

import { type ComponentType, useState } from "react";
import { BrandMark } from "@/ui/componentes/brand/brand";
import "./chat.css";

type ChatProps = {
  startOpen?: boolean;
};

export function LazyChat() {
  const [Chat, setChat] = useState<ComponentType<ChatProps> | null>(null);

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
        <BrandMark />
      </button>
    </div>
  );
}
