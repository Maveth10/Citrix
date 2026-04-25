import React from 'react';

interface TextPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function TextPanel({ handleAddBlock }: TextPanelProps) {
  return (
    <div className="flex flex-col gap-2 pb-10">
      {/* --- TYTUŁY --- */}
      <div className="mt-2 mb-1 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Tytuły główne (H1)</span>
      </div>
      <button onClick={() => handleAddBlock('h1', 'brand', 'Markowy Tytuł')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg text-left transition border-l-4 border-transparent hover:border-blue-500 group">
        <span className="text-2xl font-black text-blue-400 uppercase tracking-tighter block group-hover:scale-105 transition-transform origin-left">Markowy Tytuł</span>
      </button>
      <button onClick={() => handleAddBlock('h1', '', 'Tytuł')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg text-left transition border-l-4 border-transparent hover:border-neutral-400">
        <span className="text-xl font-bold text-white block">Zwykły Tytuł</span>
      </button>

      {/* --- NAGŁÓWKI --- */}
      <div className="mt-4 mb-1 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Podtytuły i Sekcje (H2)</span>
      </div>
      <button onClick={() => handleAddBlock('h2', 'brand', 'Markowy Nagłówek')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg text-left transition border-l-4 border-transparent hover:border-blue-500">
        <span className="text-md font-bold text-white border-b-2 border-blue-500 inline-block pb-1">Markowy Nagłówek</span>
      </button>
      <button onClick={() => handleAddBlock('h2', '', 'Nagłówek')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg text-left transition border-l-4 border-transparent hover:border-neutral-400">
        <span className="text-md font-semibold text-white block">Zwykły Nagłówek</span>
      </button>

      {/* --- AKAPITY --- */}
      <div className="mt-4 mb-1 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Długie Teksty (P)</span>
      </div>
      <button onClick={() => handleAddBlock('p', 'brand', 'Markowy Akapit')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg text-left transition border-l-4 border-transparent hover:border-blue-500">
        <span className="text-xs font-serif italic text-neutral-300 border-l-2 border-blue-500 pl-3 block">To jest elegancki, markowy akapit tekstu...</span>
      </button>
      <button onClick={() => handleAddBlock('p', '', 'Akapit')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg text-left transition border-l-4 border-transparent hover:border-neutral-400">
        <span className="text-xs text-neutral-400 block">Zwykły, standardowy blok tekstu...</span>
      </button>

      {/* --- ZAAWANSOWANE / BAJERY --- */}
      <div className="mt-4 mb-1 px-1">
        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Zaawansowane Układy</span>
      </div>
      <button onClick={() => handleAddBlock('container', 'text-combo', 'Kombinacja Tekstu')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg text-left transition border border-neutral-700 hover:border-emerald-500">
        <span className="text-sm font-bold text-white block mb-1">Główny Tytuł</span>
        <span className="text-[10px] text-neutral-500 block">Akapit znajdujący się pod tytułem. Gotowy, połączony blok.</span>
      </button>
      <button onClick={() => handleAddBlock('ribbon', '', 'Wstęga Animowana')} className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 hover:from-yellow-500/20 hover:to-orange-500/20 rounded-lg text-left transition border border-yellow-500/30 overflow-hidden">
        <span className="text-xs font-black text-yellow-500 tracking-widest animate-pulse whitespace-nowrap block">🌟 WSTĘGA (MARQUEE) ➡</span>
      </button>
      <button onClick={() => handleAddBlock('faq', '', 'Zwijane FAQ')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg text-left transition border border-neutral-700 hover:border-emerald-500">
        <span className="text-xs font-bold text-white block">▼ Pytanie (Rozwijane FAQ)</span>
      </button>
    </div>
  );
}