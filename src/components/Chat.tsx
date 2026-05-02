import { useRef, useState } from "react";
import { Menu } from "lucide-react";
import { toast } from "sonner";
import { Background } from "./Background";
import { Sidebar } from "./Sidebar";
import { ChatWindow } from "./ChatWindow";
import { InputBar } from "./InputBar";
import { useChat } from "@/hooks/useChat";
import { useSpeech } from "@/hooks/useSpeech";
import { PERSONAS } from "@/lib/personas";
import type { Message, Persona } from "@/types";
import { exportElementToPdf } from "@/lib/exportPdf";

export function Chat() {
  const [persona, setPersona] = useState<Persona>(PERSONAS[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { messages, loading, send, clear } = useChat(persona);
  const speech = useSpeech();
  const chatRef = useRef<HTMLDivElement>(null);

  const handleMicToggle = (apply: (text: string) => void) => {
    if (speech.listening) {
      speech.stopListening();
    } else {
      speech.startListening(apply);
    }
  };

  const handleSpeak = (m: Message) => {
    speech.speak(m.id, m.content);
  };

  const handleExport = async () => {
    if (!chatRef.current || messages.length === 0) {
      toast.info("Nothing to export yet");
      return;
    }
    try {
      toast.loading("Generating PDF…", { id: "export" });
      await exportElementToPdf(chatRef.current, `aurora-chat-${Date.now()}.pdf`);
      toast.success("Chat exported", { id: "export" });
    } catch {
      toast.error("Export failed", { id: "export" });
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Background />
      <div className="relative z-10 h-full flex">
        <Sidebar
          active={persona}
          onSelect={(p) => {
            setPersona(p);
            setSidebarOpen(false);
          }}
          messages={messages}
          onNewChat={clear}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 flex flex-col gap-4 p-4 md:p-6 min-w-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden glass rounded-xl h-10 w-10 flex items-center justify-center self-start"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <ChatWindow
            ref={chatRef}
            messages={messages}
            persona={persona}
            loading={loading}
            speakingId={speech.speakingId}
            onSpeak={handleSpeak}
            onStop={speech.stopSpeaking}
            ttsSupported={speech.supportsSynthesis}
          />

          <InputBar
            onSend={send}
            onExport={handleExport}
            listening={speech.listening}
            onMicToggle={handleMicToggle}
            recognitionSupported={speech.supportsRecognition}
            disabled={loading}
          />
        </main>
      </div>
    </div>
  );
}
