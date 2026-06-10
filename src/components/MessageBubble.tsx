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
  const initials = isUser ? "YOU" : persona.tag;

  return (
    <div
      className={cn(
        "group flex gap-6 py-12 border-b border-white/10 animate-fade-up w-full",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div className="shrink-0 mt-2">
        <span className="text-[11px] font-medium tracking-widest text-white/40 uppercase">
          [{initials}]
        </span>
      </div>
      <div
        className={cn(
          "max-w-[85%] flex flex-col",
          isUser ? "items-end" : "items-start",
        )}
      >
        <p
          className={cn(
            "whitespace-pre-wrap break-words",
            isUser 
              ? "text-[15px] font-sans text-white/90 text-left leading-[1.6] bg-[#2a2a2a] px-5 py-3 rounded-2xl rounded-tr-sm inline-block" 
              : "text-[16px] md:text-[17px] font-serif text-white/90 leading-[1.7]"
          )}
        >
          {message.content}
        </p>
        {!isUser && ttsSupported && (
          <button
            onClick={speaking ? onStop : onSpeak}
            className="mt-6 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[12px] font-medium uppercase tracking-widest"
            aria-label={speaking ? "Stop speaking" : "Speak message"}
          >
            {speaking ? (
              <>
                <VolumeX className="h-4 w-4" strokeWidth={1} /> Stop
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" strokeWidth={1} /> Listen
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
