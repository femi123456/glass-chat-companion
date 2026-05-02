import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getRecognition(): SpeechRecognitionLike | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
  if (!Ctor) return null;
  return new Ctor();
}

export function useSpeech() {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [listening, setListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const supportsRecognition =
    typeof window !== "undefined" &&
    !!((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition);
  const supportsSynthesis =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const startListening = useCallback(
    (onResult: (text: string) => void) => {
      if (!supportsRecognition) return;
      const rec = getRecognition();
      if (!rec) return;
      rec.lang = "en-US";
      rec.interimResults = false;
      rec.continuous = false;
      rec.onresult = (e: any) => {
        const transcript = Array.from(e.results)
          .map((r: any) => r[0].transcript)
          .join(" ");
        onResult(transcript);
      };
      rec.onerror = () => setListening(false);
      rec.onend = () => setListening(false);
      recognitionRef.current = rec;
      setListening(true);
      rec.start();
    },
    [supportsRecognition],
  );

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const speak = useCallback(
    (id: string, text: string) => {
      if (!supportsSynthesis) return;
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.onend = () => setSpeakingId(null);
      utt.onerror = () => setSpeakingId(null);
      setSpeakingId(id);
      window.speechSynthesis.speak(utt);
    },
    [supportsSynthesis],
  );

  const stopSpeaking = useCallback(() => {
    if (!supportsSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeakingId(null);
  }, [supportsSynthesis]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      if (supportsSynthesis) window.speechSynthesis.cancel();
    };
  }, [supportsSynthesis]);

  return {
    listening,
    speakingId,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    supportsRecognition,
    supportsSynthesis,
  };
}
