import { forwardRef, useEffect, useRef } from "react";
import type { Message, Persona } from "@/types";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

interface Props {
  messages: Message[];
  persona: Persona;
  loading: boolean;
  speakingId: string | null;
  onSpeak: (m: Message) => void;
  onStop: () => void;
  ttsSupported: boolean;
}

export const ChatWindow = forwardRef<HTMLDivElement, Props>(function ChatWindow(
  { messages, persona, loading, speakingId, onSpeak, onStop, ttsSupported },
  ref,
) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, loading]);

  return (
    <div
      ref={ref}
      className="glass-strong rounded-3xl flex-1 overflow-hidden flex flex-col"
    >
      <header className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
        <span className="text-2xl">{persona.emoji}</span>
        <div>
          <h2 className="font-semibold leading-tight">{persona.name}</h2>
          <p className="text-xs text-muted-foreground">
            Glassmorphic AI · ready when you are
          </p>
        </div>
      </header>
      <div ref={scrollerRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4">
        {messages.length === 0 && !loading && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-sm">
              <div className="text-5xl mb-3">{persona.emoji}</div>
              <h3 className="text-lg font-semibold mb-1">
                Chat with {persona.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Switch personas in the sidebar. Type, speak, listen, export.
              </p>
            </div>
          </div>
        )}
        {messages.map((m) => (
          <MessageBubble
            key={m.id}
            message={m}
            persona={persona}
            speaking={speakingId === m.id}
            onSpeak={() => onSpeak(m)}
            onStop={onStop}
            ttsSupported={ttsSupported}
          />
        ))}
        {loading && <TypingIndicator persona={persona} />}
      </div>
    </div>
  );
});
