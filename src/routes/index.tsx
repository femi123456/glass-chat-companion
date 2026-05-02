import { createFileRoute } from "@tanstack/react-router";
import { Chat } from "@/components/Chat";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "mono.chat — cinematic AI assistant" },
      {
        name: "description",
        content:
          "A minimalist monospace AI chatbot with persona switching, voice input, text-to-speech, and PDF export.",
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <Chat />
      <Toaster />
    </>
  );
}
