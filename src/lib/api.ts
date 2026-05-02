import type { Message } from "@/types";

const ENDPOINT =
  "https://i0mb9p8cf3.execute-api.eu-north-1.amazonaws.com/default/groq-chatbot";

export async function sendMessage(
  messages: Message[],
  systemPrompt: string,
): Promise<string> {
  const payload = {
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = (await res.json()) as { reply?: string };
  if (!data.reply) throw new Error("No reply in response");
  return data.reply;
}
