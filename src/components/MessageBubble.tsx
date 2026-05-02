import type { Message, Persona } from "@/types";
import { cn } from "@/lib/utils";
import { Volume2, Square } from "lucide-react";

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
  return (
    <div
      className={cn(
        "flex gap-3 animate-message-in",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <div className="glass h-9 w-9 rounded-full flex items-center justify-center text-lg shrink-0">
          {persona.emoji}
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words",
          isUser
            ? "glass-strong rounded-br-sm"
            : "glass rounded-bl-sm",
        )}
      >
        <p>{message.content}</p>
        {!isUser && ttsSupported && (
          <button
            onClick={speaking ? onStop : onSpeak}
            className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition"
            aria-label={speaking ? "Stop speaking" : "Speak message"}
          >
            {speaking ? (
              <>
                <Square className="h-3 w-3 fill-current" /> Stop
              </>
            ) : (
              <>
                <Volume2 className="h-3 w-3" /> Listen
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
