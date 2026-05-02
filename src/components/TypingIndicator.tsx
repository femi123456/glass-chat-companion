import type { Persona } from "@/types";

export function TypingIndicator({ persona }: { persona: Persona }) {
  return (
    <div className="flex gap-3 py-4 border-b border-[rgba(255,255,255,0.04)] animate-fade-up">
      <div className="h-6 w-6 rounded-full bg-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-[10px] tracking-wider text-white/70">
          {persona.tag}
        </span>
      </div>
      <div className="flex items-center gap-1.5 h-6">
        <span className="h-1 w-1 rounded-full bg-white/40 dot-pulse-1" />
        <span className="h-1 w-1 rounded-full bg-white/40 dot-pulse-2" />
        <span className="h-1 w-1 rounded-full bg-white/40 dot-pulse-3" />
      </div>
    </div>
  );
}
