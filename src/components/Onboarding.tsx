import React from "react";
import { PERSONAS } from "@/lib/personas";
import type { Persona } from "@/types";
import { Magnetic } from "./Magnetic";

interface Props {
  visible?: boolean;
  onSelect: (p: Persona) => void;
}

export function Onboarding({ visible = true, onSelect }: Props) {
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-20 flex flex-col items-center justify-center h-[100vh] w-full overflow-hidden transition-opacity duration-700 ease-in-out bg-[#1c1c1c] ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Subtle Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] border border-white/5 rounded-full animate-float-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] border border-white/5 rounded-full animate-float-slower" />
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-white/[0.02] blur-[100px] rounded-full animate-float-slow" />
        <div className="absolute bottom-[20%] left-[20%] w-[400px] h-[400px] bg-white/[0.01] blur-[80px] rounded-full animate-float-slower" />
      </div>

      <div className="w-full max-w-[900px] flex flex-col px-8 relative z-10">
        <h1 
          className="text-[64px] md:text-[80px] font-normal text-white leading-none tracking-tight mb-2"
        >
          femi.ai
        </h1>
        <p className="text-[18px] font-light mt-4 text-white/60 mb-16">
          Select a persona to begin.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              className="text-left w-full cursor-pointer transition-all duration-300 border-b border-white/20 pb-6 group hover:border-white/50 flex flex-row justify-between items-center"
            >
              <div className="flex flex-col justify-center">
                <Magnetic strength={0.15}>
                  <span className="inline-block text-[64px] md:text-[80px] font-display uppercase text-white leading-[0.85] tracking-wide transition-all group-hover:scale-[1.02] origin-left">
                    {p.name}
                  </span>
                </Magnetic>
              </div>
              <div className="flex flex-col items-end text-right gap-1 ml-4 min-w-[100px]">
                <span className="text-[14px] font-serif uppercase text-white tracking-widest leading-none">
                  THE {p.tag}
                </span>
                <span className="text-[11px] font-light uppercase tracking-wider text-white/60 leading-tight max-w-[120px]">
                  {p.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
