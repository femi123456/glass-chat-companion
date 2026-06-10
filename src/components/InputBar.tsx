import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Mic, ArrowUp, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

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
        className="max-w-3xl mx-auto flex items-center gap-4 px-2"
      >
        <Magnetic strength={0.3}>
          <button
            type="button"
            disabled={!recognitionSupported}
            onClick={() =>
              onMicToggle((t) => setValue((v) => (v ? `${v} ${t}` : t)))
            }
            className={cn(
              "h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-white/40 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed",
              isListening && "mic-pulse text-white",
            )}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
          >
            <Mic className="h-5 w-5" strokeWidth={1} />
          </button>
        </Magnetic>

        <div className="flex-1 relative border-b border-white/20 focus-within:border-white transition-colors">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            placeholder="Write a message..."
            rows={1}
            className="w-full resize-none bg-transparent outline-none py-3 text-[16px] font-light text-white placeholder:text-white/30 max-h-40"
          />
        </div>

        <Magnetic strength={0.3}>
          <button
            type="button"
            onClick={onExport}
            className="h-10 w-10 shrink-0 flex items-center justify-center text-white/40 hover:text-white transition"
            aria-label="Export chat as PDF"
          >
            <Download className="h-5 w-5" strokeWidth={1} />
          </button>
        </Magnetic>

        <Magnetic strength={0.5}>
          <button
            type="submit"
            disabled={!value.trim() || disabled}
            className="h-10 w-10 shrink-0 rounded-full editorial-btn flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Send message"
          >
            <ArrowUp className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </Magnetic>
      </form>
    </div>
  );
}
