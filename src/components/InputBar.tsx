import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Mic, ArrowUp, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onSend: (text: string) => void;
  onExport: () => void;
  isListening: boolean;
  onMicToggle: (apply: (text: string) => void) => void;
  recognitionSupported: boolean;
  disabled: boolean;
}

export function InputBar({
  onSend,
  onExport,
  isListening,
  onMicToggle,
  recognitionSupported,
  disabled,
}: Props) {
  const [value, setValue] = useState("");

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="px-6 md:px-12 pb-6">
      <form
        onSubmit={submit}
        className="max-w-3xl mx-auto glass-panel rounded-[8px] flex items-center gap-1 px-2 py-1.5"
      >
        <button
          type="button"
          disabled={!recognitionSupported}
          onClick={() =>
            onMicToggle((t) => setValue((v) => (v ? `${v} ${t}` : t)))
          }
          className={cn(
            "h-8 w-8 shrink-0 rounded-[6px] flex items-center justify-center text-white/50 hover:text-white/85 transition disabled:opacity-30 disabled:cursor-not-allowed",
            isListening && "mic-pulse text-white/85",
          )}
          aria-label={isListening ? "Stop listening" : "Start voice input"}
        >
          <Mic className="h-4 w-4" />
        </button>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          placeholder="_ type your message"
          rows={1}
          className="flex-1 resize-none bg-transparent outline-none px-2 py-2 text-[13px] text-white/90 placeholder:text-white/30 max-h-40"
        />

        <button
          type="button"
          onClick={onExport}
          className="h-8 w-8 shrink-0 rounded-[6px] flex items-center justify-center text-white/50 hover:text-white/85 transition"
          aria-label="Export chat as PDF"
        >
          <Download className="h-4 w-4" />
        </button>

        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className="h-8 w-8 shrink-0 rounded-[6px] bg-white/[0.08] hover:bg-white/15 flex items-center justify-center text-white/85 transition disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
