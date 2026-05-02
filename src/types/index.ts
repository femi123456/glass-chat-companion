export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export interface Persona {
  id: string;
  name: string;
  emoji: string;
  systemPrompt: string;
}
