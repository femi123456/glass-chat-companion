export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface Persona {
  id: string;
  tag: string;
  name: string;
  systemPrompt: string;
  description?: string;
  greeting?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  personaId: string;
  createdAt: Date;
}
