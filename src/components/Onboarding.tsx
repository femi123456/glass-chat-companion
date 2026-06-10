import React from "react";
import { PERSONAS } from "@/lib/personas";
import type { Persona } from "@/types";

interface Props {
  visible?: boolean;
  onSelect: (p: Persona) => void;
}

export function Onboarding({ visible = true, onSelect }: Props) {
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-20 flex flex-col items-center justify-center h-[100vh] w-full transition-opacity duration-400 ease-in-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full max-w-[480px] flex flex-col items-center">
        <h1 
          className="text-[48px] font-bold text-white leading-none"
          style={{ letterSpacing: "-0.03em" }}
        >
          femi.ai
        </h1>
        <p className="text-[13px] italic mt-[12px]" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
          _ select a persona to begin
        </p>

        <div className="w-full flex flex-col gap-[8px] mt-[40px]">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              className="text-left w-full cursor-pointer transition-colors duration-200"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "0.5px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
                padding: "14px 20px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[11px]" style={{ color: "rgba(255, 255, 255, 0.4)" }}>[{p.tag}]</span>
                <span className="text-[14px] font-bold text-white">{p.name}</span>
              </div>
              <div className="text-[12px] mt-1" style={{ color: "rgba(255, 255, 255, 0.35)" }}>{p.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
