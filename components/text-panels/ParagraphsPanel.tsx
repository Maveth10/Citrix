import React from 'react';

export default function ParagraphsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-white/5">
      <button onClick={() => handleAddBlock('p', 'eyebrow', 'Etykieta')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase">Zacznij Tutaj (Eyebrow)</span>
      </button>
      <button onClick={() => handleAddBlock('p', 'lead', 'Akapit Wiodący')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-sm text-neutral-300 block italic border-l-2 border-blue-500 pl-3">To jest elegancki, markowy akapit tekstu (Lead)...</span>
      </button>
      <button onClick={() => handleAddBlock('p', 'quote', 'Cytat')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-xs italic text-neutral-400 border-l-2 border-blue-500 pl-3 block">"Wybitny design to taki, z którego nie można już nic zabrać."</span>
      </button>
      <button onClick={() => handleAddBlock('p', '', 'Zwykły Akapit')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-xs text-neutral-400 block leading-relaxed">Zwykły, standardowy blok tekstu. Idealny do dłuższych opisów.</span>
      </button>
    </div>
  );
}