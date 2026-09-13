"use client";

import { type ComponentType, useState } from "react";
import { BrandMark } from "@/components/ui/brand";

type ChatProps = {
  startOpen?: boolean;
  welcome: string;
  questions: string[];
};

export function LazyChat({ welcome, questions }: { welcome: string; questions: string[] }) {
  const [Chat, setChat] = useState<ComponentType<ChatProps> | null>(null);

  if (Chat) return <Chat startOpen welcome={welcome} questions={questions} />;

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
