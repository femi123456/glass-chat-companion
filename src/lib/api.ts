import type { Message } from "@/types";

const ENDPOINT = "https://q5j3ckrjwl7dtncyil2ihkqlpy0ndeao.lambda-url.eu-north-1.on.aws/";

export async function sendMessage(
  messages: Message[],
  systemPrompt: string,
): Promise<string> {
  const formattedPrompt = `System: ${systemPrompt}\n${messages
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n")}\nAssistant:`;

  const payload = {
    message: formattedPrompt,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  const data = (await res.json()) as { reply?: string };
  if (!data.reply) throw new Error("No reply in response");
  return data.reply;
}
