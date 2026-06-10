import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { sendMessage } from "@/lib/api";
import { PERSONAS } from "@/lib/personas";
import type { Conversation, Message, Persona } from "@/types";

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const titleFrom = (text: string) =>
  text.trim().split(/\s+/).slice(0, 4).join(" ") || "New chat";

export function useChat() {
  const [activePersona, setActivePersona] = useState<Persona>(PERSONAS[0]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Sync messages back into the active conversation
  useEffect(() => {
    if (!activeId) return;
    setConversations((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, messages } : c)),
    );
  }, [messages, activeId]);

  const sendMessageAction = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      let convId = activeId;
      const next = [...messages, userMsg];

      // Create a new conversation on first message
      if (!convId) {
        convId = uid();
        const newConv: Conversation = {
          id: convId,
          title: titleFrom(trimmed),
          messages: next,
          personaId: activePersona.id,
          createdAt: new Date(),
        };
        setConversations((prev) => [newConv, ...prev]);
        setActiveId(convId);
      } else {
        // Update title if it was empty
        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId && c.messages.length === 0
              ? { ...c, title: titleFrom(trimmed) }
              : c,
          ),
        );
      }

      setMessages(next);
      setLoading(true);

      try {
        const reply = await sendMessage(next, activePersona.systemPrompt);
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: reply,
            timestamp: new Date(),
          },
        ]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Something went wrong";
        toast.error("Failed to get a reply", { description: msg });
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, activePersona, activeId],
  );

  const resetChat = useCallback(() => {
    setMessages([]);
    setActiveId(null);
  }, []);

  const switchPersona = useCallback((p: Persona) => {
    setActivePersona(p);
    setMessages([]);
    setActiveId(null);
  }, []);

  const startSessionWithPersona = useCallback((p: Persona) => {
    setActivePersona(p);
    setMessages([
      {
        id: uid(),
        role: "assistant",
        content: p.greeting || "ready_",
        timestamp: new Date(),
      },
    ]);
    setActiveId(null);
  }, []);

  const loadConversation = useCallback(
    (id: string) => {
      const conv = conversations.find((c) => c.id === id);
      if (!conv) return;
      const persona = PERSONAS.find((p) => p.id === conv.personaId);
      if (persona) setActivePersona(persona);
      setMessages(conv.messages);
      setActiveId(id);
    },
    [conversations],
  );

  return {
    messages,
    loading,
    sendMessage: sendMessageAction,
    resetChat,
    activePersona,
    switchPersona,
    startSessionWithPersona,
    conversations,
    activeId,
    loadConversation,
  };
}
