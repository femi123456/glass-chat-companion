import { X, Plus, MessageSquare } from "lucide-react";
import { PERSONAS } from "@/lib/personas";
import type { Conversation, Persona } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  activePersona: Persona;
  onSelectPersona: (p: Persona) => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
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
          "fixed inset-y-0 left-0 z-40 w-[260px] glass-panel flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-4 h-12 border-b border-[rgba(255,255,255,0.05)]">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
            mono.chat
          </span>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/80 transition"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-4 py-4">
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-3">
            Personas
          </p>
          <div className="space-y-1">
            {PERSONAS.map((p) => {
              const active = p.id === activePersona.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPersona(p)}
                  className={cn(
                    "w-full flex items-center gap-3 px-2.5 py-2 rounded-[8px] text-left transition",
                    active
                      ? "bg-white/[0.04] border-[0.5px] border-white/15 text-white/90"
                      : "border-[0.5px] border-transparent text-white/55 hover:text-white/80 hover:bg-white/[0.02]",
                  )}
                >
                  <span className="text-[10px] text-white/40">[{p.tag}]</span>
                  <span className="text-[12px]">{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 px-4 pb-4 min-h-0 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
              History
            </p>
            <button
              onClick={onNewChat}
              className="text-white/40 hover:text-white/80 transition"
              aria-label="New chat"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 -mx-1 px-1">
            {conversations.length === 0 ? (
              <p className="text-[11px] text-white/25 px-2">No chats yet</p>
            ) : (
              conversations.map((c) => {
                const active = c.id === activeConversationId;
                return (
                  <button
                    key={c.id}
                    onClick={() => onSelectConversation(c.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[8px] text-left transition",
                      active
                        ? "bg-white/[0.04] text-white/85"
                        : "text-white/45 hover:text-white/75 hover:bg-white/[0.02]",
                    )}
                  >
                    <MessageSquare className="h-3 w-3 shrink-0 opacity-50" />
                    <span className="text-[11px] truncate">{c.title}</span>
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
