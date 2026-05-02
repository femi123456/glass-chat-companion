import { useCallback, useState } from "react";
import { toast } from "sonner";
import { sendMessage } from "@/lib/api";
import type { Message, Persona } from "@/types";

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export function useChat(persona: Persona) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const send = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };
      const next = [...messages, userMsg];
      setMessages(next);
      setLoading(true);

      try {
        const reply = await sendMessage(next, persona.systemPrompt);
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: reply,
            timestamp: Date.now(),
          },
        ]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Something went wrong";
        toast.error("Failed to get a reply", { description: msg });
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, persona.systemPrompt],
  );

  const clear = useCallback(() => setMessages([]), []);

  return { messages, loading, send, clear };
}
