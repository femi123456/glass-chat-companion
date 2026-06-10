import { X, Plus, MessageSquare, Home } from "lucide-react";
import { PERSONAS } from "@/lib/personas";
import type { Conversation, Persona } from "@/types";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

interface Props {
  open: boolean;
  onClose: () => void;
  activePersona: Persona;
  onSelectPersona: (p: Persona) => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onShowHome: () => void;
}

export function Sidebar({
  open,
  onClose,
  activePersona,
  onSelectPersona,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onShowHome,
}: Props) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 h-[100vh] w-[320px] flex flex-col transition-transform duration-500 ease-in-out z-[100] bg-[#151515] border-r border-white/10",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-8 h-24 border-b border-white/10">
          <span className="text-[28px] font-serif text-white tracking-wide">
            femi.ai
          </span>
          <div className="flex items-center gap-2">
            <Magnetic strength={0.4}>
              <button
                onClick={onShowHome}
                className="text-white/60 hover:text-white transition bg-transparent hover:bg-white/5 p-3 rounded-full inline-block"
                aria-label="Home"
              >
                <Home className="h-5 w-5" strokeWidth={1} />
              </button>
            </Magnetic>
            <Magnetic strength={0.4}>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition bg-transparent hover:bg-white/5 p-3 rounded-full inline-block"
                aria-label="Close sidebar"
              >
                <X className="h-6 w-6" strokeWidth={1} />
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="px-8 py-8">
          <p className="text-[10px] font-medium tracking-[0.2em] text-white/40 mb-6 uppercase">
            Personas
          </p>
          <div className="flex flex-col">
            {PERSONAS.map((p) => {
              const active = p.id === activePersona.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPersona(p)}
                  className={cn(
                    "w-full flex flex-col items-start py-4 text-left transition-all editorial-panel group",
                    active
                      ? "text-white"
                      : "text-white/50 hover:text-white"
                  )}
                >
                  <div className="flex items-baseline justify-between w-full">
                    <span className={cn("text-[32px] font-display uppercase tracking-wide transition-all", active ? "scale-105 origin-left" : "group-hover:scale-105 origin-left")}>{p.name}</span>
                    <span className="text-[10px] uppercase tracking-widest text-white/40">[{p.tag}]</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 px-8 pb-8 min-h-0 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] font-medium tracking-[0.2em] text-white/40 uppercase">
              History
            </p>
            <button
              onClick={onNewChat}
              className="text-white/50 hover:text-white p-2 rounded-full transition"
              aria-label="New chat"
            >
              <Plus className="h-5 w-5" strokeWidth={1} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col">
            {conversations.length === 0 ? (
              <p className="text-[14px] font-light text-white/30 italic">No previous sessions.</p>
            ) : (
              conversations.map((c) => {
                const active = c.id === activeConversationId;
                return (
                  <button
                    key={c.id}
                    onClick={() => onSelectConversation(c.id)}
                    className={cn(
                      "w-full flex items-center gap-3 py-4 text-left transition-all editorial-panel group",
                      active
                        ? "text-white"
                        : "text-white/50 hover:text-white"
                    )}
                  >
                    <MessageSquare className="h-4 w-4 shrink-0 opacity-50" strokeWidth={1} />
                    <span className="text-[14px] font-light truncate">{c.title}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
