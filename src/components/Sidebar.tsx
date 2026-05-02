import { PERSONAS } from "@/lib/personas";
import type { Persona, Message } from "@/types";
import { cn } from "@/lib/utils";
import { MessageSquare, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  active: Persona;
  onSelect: (p: Persona) => void;
  messages: Message[];
  onNewChat: () => void;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ active, onSelect, messages, onNewChat, open, onClose }: Props) {
  const firstUser = messages.find((m) => m.role === "user");
  const preview = firstUser?.content.slice(0, 40) ?? "New conversation";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "glass-strong fixed md:static inset-y-0 left-0 z-40 w-72 p-4 flex flex-col gap-4 transition-transform md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight">Aurora Chat</h1>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 px-1">
            Personas
          </p>
          <div className="space-y-1">
            {PERSONAS.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelect(p)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all",
                  active.id === p.id
                    ? "glass-strong glow-primary"
                    : "hover:bg-white/5",
                )}
              >
                <span className="text-xl">{p.emoji}</span>
                <span className="font-medium">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-2 px-1">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              History
            </p>
            <button
              onClick={onNewChat}
              className="p-1 rounded-md hover:bg-white/10 transition"
              aria-label="New chat"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          {messages.length === 0 ? (
            <p className="text-xs text-muted-foreground px-3 py-2">
              No messages yet
            </p>
          ) : (
            <div className="glass rounded-xl p-3 flex items-start gap-2">
              <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-sm truncate">{preview}</p>
                <p className="text-xs text-muted-foreground">
                  {messages.length} message{messages.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>
          )}
        </div>

        <p className="text-[10px] text-muted-foreground/60 text-center">
          Glass · v1
        </p>
      </aside>
    </>
  );
}
