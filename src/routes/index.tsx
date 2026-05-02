import { createFileRoute } from "@tanstack/react-router";
import { Chat } from "@/components/Chat";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Aurora Chat — Glassmorphic AI Assistant" },
      {
        name: "description",
        content:
          "A glassmorphic AI chatbot with persona switching, voice input, text-to-speech, and PDF export.",
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
