import { Volume2, VolumeX } from "lucide-react";
import type { Message, Persona } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  message: Message;
  persona: Persona;
  speaking: boolean;
  onSpeak: () => void;
  onStop: () => void;
  ttsSupported: boolean;
}

export function MessageBubble({
  message,
  persona,
  speaking,
  onSpeak,
  onStop,
  ttsSupported,
}: Props) {
  const isUser = message.role === "user";
  const initials = isUser ? "YO" : persona.tag;

  return (
    <div
      className={cn(
        "group flex gap-3 py-4 border-b border-[rgba(255,255,255,0.04)] animate-fade-up",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div className="h-6 w-6 rounded-full bg-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-[10px] tracking-wider text-white/70">
          {initials}
        </span>
      </div>
      <div
        className={cn(
          "flex-1 min-w-0 flex flex-col",
          isUser ? "items-end" : "items-start",
        )}
      >
        <p
          className={cn(
            "text-[14px] leading-[1.7] whitespace-pre-wrap break-words max-w-[680px]",
            isUser ? "text-right" : "text-left",
          )}
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          {message.content}
        </p>
        {!isUser && ttsSupported && (
          <button
            onClick={speaking ? onStop : onSpeak}
            className="mt-2 text-white/30 hover:text-white/80 transition opacity-0 group-hover:opacity-100"
            aria-label={speaking ? "Stop speaking" : "Speak message"}
          >
            {speaking ? (
              <VolumeX className="h-3.5 w-3.5" />
            ) : (
              <Volume2 className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
