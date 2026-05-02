import type { Persona } from "@/types";

export function TypingIndicator({ persona }: { persona: Persona }) {
  return (
    <div className="flex gap-3 animate-message-in">
      <div className="glass h-9 w-9 rounded-full flex items-center justify-center text-lg shrink-0">
        {persona.emoji}
      </div>
      <div className="glass rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="dot-1 h-2 w-2 rounded-full bg-foreground/70" />
        <span className="dot-2 h-2 w-2 rounded-full bg-foreground/70" />
        <span className="dot-3 h-2 w-2 rounded-full bg-foreground/70" />
      </div>
    </div>
  );
}
