import React from 'react';

interface TextPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function TextPanel({ handleAddBlock }: TextPanelProps) {
  return (
    <div className="flex flex-col gap-4 pb-10">
      
      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Tytuły główne (H1)</span>
      </div>
      <button onClick={() => handleAddBlock('h1', 'brand', 'Markowy Tytuł')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-xl font-black text-blue-500 block mb-1 uppercase tracking-tighter">Markowy Tytuł</span>
      </button>
      <button onClick={() => handleAddBlock('h1', '', 'Zwykły Tytuł')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-xl font-bold text-white block mb-1 tracking-tight">Zwykły Tytuł</span>
      </button>

      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Podtytuły i Sekcje (H2)</span>
      </div>
      <button onClick={() => handleAddBlock('h2', 'brand', 'Markowy Nagłówek')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-lg font-bold text-white block border-b-2 border-blue-500 inline-block pb-1">Markowy Nagłówek</span>
      </button>
      <button onClick={() => handleAddBlock('h2', '', 'Zwykły Nagłówek')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-lg font-bold text-white block">Zwykły Nagłówek</span>
      </button>

      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Długie Teksty (P)</span>
      </div>
      <button onClick={() => handleAddBlock('p', 'lead', 'Akapit Wiodący')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-sm text-neutral-300 block italic border-l-2 border-blue-500 pl-3">To jest elegancki, markowy akapit tekstu, który...</span>
      </button>
      <button onClick={() => handleAddBlock('p', '', 'Zwykły Akapit')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition w-full">
        <span className="text-xs text-neutral-400 block leading-relaxed">Zwykły, standardowy blok tekstu. Idealny do dłuższych opisów na stronie.</span>
      </button>

      <div className="mt-4 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Wyróżnienia (Callouts)</span>
      </div>
      <div className="flex flex-col gap-2">
        <button onClick={() => handleAddBlock('alert', 'success', 'Sukces')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-emerald-500 text-left w-full flex items-center gap-3">
          <span className="text-emerald-500 text-lg">✅</span>
          <span className="text-xs font-bold text-white">Sukces (Success)</span>
        </button>

        <button onClick={() => handleAddBlock('alert', 'warning', 'Uwaga')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-amber-500 text-left w-full flex items-center gap-3">
          <span className="text-amber-500 text-lg">⚠️</span>
          <span className="text-xs font-bold text-white">Ostrzeżenie (Warning)</span>
        </button>

        <button onClick={() => handleAddBlock('alert', 'tip', 'Wskazówka')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-blue-500 text-left w-full flex items-center gap-3">
          <span className="text-blue-500 text-lg">💡</span>
          <span className="text-xs font-bold text-white">Wskazówka (Tip)</span>
        </button>

        {/* NOWOŚĆ V17.6: ALERT SECURITY */}
        <button 
          onClick={() => handleAddBlock('container', 'notice-box', 'Złożony Alert')} 
          className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-red-500 text-left w-full flex items-center gap-4 relative mt-2 group"
        >
           <div className="w-12 h-8 border border-red-500 bg-red-200 rounded relative shrink-0 group-hover:scale-110 transition-transform">
             <div className="absolute -top-1.5 left-1 bg-red-500 w-8 h-2.5 rounded-sm"></div>
           </div>
           <div>
             <span className="text-xs font-bold text-white block mb-0.5">Alert z Plakietką</span>
             <span className="text-[9px] text-neutral-400 block leading-tight">Profesjonalny blok ze znacznikiem na krawędzi.</span>
           </div>
        </button>
      </div>

    </div>
  );
}