import React from 'react';

export default function HeadingsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-white/5">
      <button onClick={() => handleAddBlock('h1', 'brand', 'Markowy Tytuł')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-xl font-black text-blue-500 block uppercase tracking-tighter leading-none">Markowy Tytuł</span>
      </button>
      <button onClick={() => handleAddBlock('h1', 'gradient', 'Gradient H1')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-xl font-black leading-none bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tight">Magiczny Gradient</span>
      </button>
      <button onClick={() => handleAddBlock('h1', 'outline', 'Outline H1')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-xl font-black leading-none text-transparent tracking-tight" style={{ WebkitTextStroke: '1px white' }}>Pusty w Środku</span>
      </button>
      <button onClick={() => handleAddBlock('h1', 'highlight', 'H1 Wyróżnik')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-xl font-black leading-none text-white tracking-tight">Kluczowy <span style={{ background: 'linear-gradient(120deg, rgba(253,224,71,0.8) 0%, rgba(253,224,71,0.8) 100%) no-repeat', backgroundSize: '100% 35%', backgroundPosition: '0 90%' }}>Wyróżnik</span></span>
      </button>
      <button onClick={() => handleAddBlock('h1', '', 'Zwykły Tytuł')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-xl font-bold text-white block tracking-tight leading-none">Zwykły Tytuł</span>
      </button>

      <div className="w-full h-px bg-white/5 my-1"></div>

      <button onClick={() => handleAddBlock('h2', 'brand', 'Markowy Nagłówek')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-sm font-bold text-white block border-b-2 border-blue-500 pb-1 w-max">Markowy Nagłówek</span>
      </button>
      <button onClick={() => handleAddBlock('h2', '', 'Zwykły Nagłówek')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-sm font-bold text-white block">Zwykły Nagłówek</span>
      </button>
    </div>
  );
}