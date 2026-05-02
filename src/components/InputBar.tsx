import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Mic, MicOff, Send, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onSend: (text: string) => void;
  onExport: () => void;
  listening: boolean;
  onMicToggle: (apply: (text: string) => void) => void;
  recognitionSupported: boolean;
  disabled: boolean;
}

export function InputBar({
  onSend,
  onExport,
  listening,
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
    <form
      onSubmit={submit}
      className="glass-strong rounded-2xl p-2 flex items-end gap-2"
    >
      <button
        type="button"
        disabled={!recognitionSupported}
        onClick={() => onMicToggle((t) => setValue((v) => (v ? `${v} ${t}` : t)))}
        className={cn(
          "h-11 w-11 shrink-0 rounded-xl flex items-center justify-center transition",
          listening
            ? "bg-primary text-primary-foreground glow-primary"
            : "glass hover:bg-white/10",
          !recognitionSupported && "opacity-40 cursor-not-allowed",
        )}
        aria-label={listening ? "Stop listening" : "Start voice input"}
        title={
          recognitionSupported
            ? "Voice input"
            : "Voice input not supported in this browser"
        }
      >
        {listening ? <Waveform /> : recognitionSupported ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
      </button>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKey}
        placeholder={listening ? "Listening…" : "Type a message…"}
        rows={1}
        className="flex-1 resize-none bg-transparent outline-none px-2 py-3 text-sm placeholder:text-muted-foreground max-h-40"
      />

      <button
        type="button"
        onClick={onExport}
        className="h-11 w-11 shrink-0 rounded-xl glass hover:bg-white/10 flex items-center justify-center transition"
        aria-label="Export chat"
        title="Export as PDF"
      >
        <Download className="h-5 w-5" />
      </button>

      <button
        type="submit"
        disabled={!value.trim() || disabled}
        className="h-11 w-11 shrink-0 rounded-xl bg-primary text-primary-foreground flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 glow-primary"
        aria-label="Send message"
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}

function Waveform() {
  return (
    <div className="flex items-end gap-0.5 h-5">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="wave-bar w-0.5 bg-current rounded-full"
          style={{
            height: "100%",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
