import { useRef, useState } from "react";
import { Menu } from "lucide-react";
import { toast } from "sonner";
import { Background } from "./Background";
import { Sidebar } from "./Sidebar";
import { ChatWindow } from "./ChatWindow";
import { InputBar } from "./InputBar";
import { Onboarding } from "./Onboarding";
import { useChat } from "@/hooks/useChat";
import { useSpeech } from "@/hooks/useSpeech";
import type { Message } from "@/types";
import { exportElementToPdf } from "@/lib/exportPdf";

export function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    messages,
    loading,
    sendMessage,
    resetChat,
    activePersona,
    switchPersona,
    startSessionWithPersona,
    conversations,
    activeId,
    loadConversation,
  } = useChat();
  const speech = useSpeech();
  const chatRef = useRef<HTMLDivElement>(null);
  const [showOnboarding, setShowOnboarding] = useState(messages.length === 0);

  const handleMicToggle = (apply: (text: string) => void) => {
    if (speech.isListening) speech.stopListening();
    else speech.startListening(apply);
  };

  const handleSpeak = (m: Message) => speech.speak(m.id, m.content);

  const handleExport = async () => {
    if (messages.length === 0) {
      toast.info("Nothing to export yet");
      return;
    }
    try {
      toast.loading("Generating PDF…", { id: "export" });
      await exportElementToPdf(messages, activePersona, "femi-ai-chat.pdf");
      toast.success("Chat exported", { id: "export" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Export failed";
      toast.error("Export failed", { description: msg, id: "export" });
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden font-mono">
      <Background />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePersona={activePersona}
        onSelectPersona={(p) => {
          switchPersona(p);
          setSidebarOpen(false);
        }}
        conversations={conversations}
        activeConversationId={activeId}
        onSelectConversation={(id) => {
          loadConversation(id);
          setSidebarOpen(false);
        }}
        onNewChat={() => {
          resetChat();
          setSidebarOpen(false);
        }}
      />

      <main className="relative z-10 h-full flex flex-col">
        {!showOnboarding && (
          <header className="flex items-center h-12 px-4 border-b border-[rgba(255,255,255,0.05)] glass-panel-flat">
            <button
              onClick={() => setSidebarOpen(true)}
              className="h-8 w-8 flex items-center justify-center text-white/60 hover:text-white/90 transition"
              aria-label="Open sidebar"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="ml-3 flex items-baseline gap-2">
              <span className="text-[10px] tracking-[0.2em] text-white/40">
                [{activePersona.tag}]
              </span>
              <span className="text-[12px] text-white/85">
                {activePersona.name}
              </span>
              <span className="text-[10px] text-white/25 ml-2">
                · ready_
              </span>
            </div>
          </header>
        )}

        <Onboarding
          visible={showOnboarding}
          onSelect={(p) => {
            startSessionWithPersona(p);
            setShowOnboarding(false);
          }}
        />

        {!showOnboarding && (
          <ChatWindow
            ref={chatRef}
            messages={messages}
            persona={activePersona}
            loading={loading}
            speakingId={speech.speakingId}
            onSpeak={handleSpeak}
            onStop={speech.stopSpeaking}
            ttsSupported={speech.supportsSynthesis}
          />
        )}

        {!showOnboarding && (
          <InputBar
            onSend={sendMessage}
            onExport={handleExport}
            isListening={speech.isListening}
            onMicToggle={handleMicToggle}
            recognitionSupported={speech.supportsRecognition}
            disabled={loading}
          />
        )}
      </main>
    </div>
  );
}
