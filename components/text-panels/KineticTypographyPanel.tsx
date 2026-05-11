import React from 'react';

interface PanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function KineticTypographyPanel({ handleAddBlock }: PanelProps) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-white/5 border-x border-b border-[color:var(--theme-color)]/20 rounded-b-xl border-t-0 animate-in slide-in-from-top-2 duration-300">
      
      {/* 1. Maszyna do pisania */}
      <button 
        onClick={() => handleAddBlock('p', 'typewriter', 'Maszyna do pisania')}
        className="w-full flex flex-col items-center justify-center p-4 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all group shadow-sm overflow-hidden"
      >
        <span className="text-lg font-mono font-bold text-white border-r-2 border-[#ff4500] pr-1 group-hover:animate-pulse">
          C:\&gt; HELLO_
        </span>
        <span className="text-[9px] text-neutral-500 mt-2 uppercase tracking-widest group-hover:text-neutral-300">
          Pisanie na żywo
        </span>
      </button>

      {/* 2. Glitch */}
      <button 
        onClick={() => handleAddBlock('h2', 'glitch', 'Cyber Glitch')}
        className="w-full flex flex-col items-center justify-center p-4 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all group shadow-sm"
      >
        <span 
          className="text-2xl font-black tracking-widest uppercase transition-transform group-hover:scale-105 text-white relative"
          style={{ textShadow: '2px 0 red, -2px 0 cyan' }}
        >
          GLITCH
        </span>
        <span className="text-[9px] text-neutral-500 mt-2 uppercase tracking-widest group-hover:text-neutral-300">
          Zakłócenia RGB
        </span>
      </button>

      {/* 3. Marquee (Nieskończony Scroll) */}
      <button 
        onClick={() => handleAddBlock('h1', 'marquee-text', 'Pasek Marquee')}
        className="w-full flex flex-col items-center justify-center p-4 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all group shadow-sm overflow-hidden"
      >
        <div className="w-full overflow-hidden flex whitespace-nowrap">
           <span className="text-xl font-black italic text-transparent opacity-50 group-hover:opacity-100 transition-opacity" style={{ WebkitTextStroke: '1px #ff4500' }}>
             PRZEWIJANY TEKST • PRZEWIJANY TEKST
           </span>
        </div>
        <span className="text-[9px] text-neutral-500 mt-2 uppercase tracking-widest group-hover:text-neutral-300">
          Nieskończony scroll
        </span>
      </button>

    </div>
  );
}