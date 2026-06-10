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
    <div ref={ref} className="flex-1 min-h-0 flex flex-col">
      <div 
        ref={scrollerRef} 
        className="flex-1 overflow-y-auto flex flex-col"
        style={{ padding: "24px 20px", gap: "20px" }}
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
          {messages.length === 0 && !loading && (
            <div className="flex-1 flex items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: "rgba(255, 255, 255, 0.25)" }}>
                  [{persona.tag}] {persona.name}
                </p>
                <p className="text-[13px]" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                  _ start a conversation
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
    </div>
  );
});
