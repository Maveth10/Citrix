import React from 'react';

const btnClass = "group relative overflow-hidden w-full text-left p-4 rounded-xl bg-gradient-to-br from-[#19191e]/95 to-[#0a0a0f]/98 border border-white/5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-[color:var(--theme-color)] hover:shadow-[0_0_25px_var(--theme-shadow),inset_0_0_15px_var(--theme-shadow),0_10px_20px_rgba(0,0,0,0.9)] before:absolute before:inset-0 before:-left-[100%] before:w-1/2 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:-skew-x-12 before:transition-all before:duration-700 hover:before:left-[200%] cursor-grab active:cursor-grabbing";
const titleClass = "text-[12px] font-bold text-neutral-300 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_var(--theme-color)] flex items-center gap-2 mb-1";
const descClass = "text-[10px] text-neutral-500 group-hover:text-neutral-300 transition-colors";

export default function TextPanel({ handleAddBlock }: any) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-[10px] font-bold text-neutral-500 mb-1 tracking-widest uppercase border-b border-white/5 pb-2">Główne</div>
      
      <button className={btnClass} onClick={() => handleAddBlock('h1', '', 'Nagłówek H1')}>
        <div className={titleClass}><span className="text-lg">H1</span> Główny Tytuł</div>
        <div className={descClass}>Najważniejszy nagłówek na stronie (SEO).</div>
      </button>

      <button className={btnClass} onClick={() => handleAddBlock('h2', '', 'Nagłówek H2')}>
        <div className={titleClass}><span className="text-base">H2</span> Tytuł Sekcji</div>
        <div className={descClass}>Nagłówek wspierający strukturę.</div>
      </button>

      <div className="text-[10px] font-bold text-neutral-500 mb-1 mt-2 tracking-widest uppercase border-b border-white/5 pb-2">Treść</div>
      
      <button className={btnClass} onClick={() => handleAddBlock('p', '', 'Akapit')}>
        <div className={titleClass}><span className="text-base">¶</span> Zwykły Tekst</div>
        <div className={descClass}>Podstawowy blok tekstu. Pisz do woli.</div>
      </button>

      <button className={btnClass} onClick={() => handleAddBlock('marquee', '', 'Przesuwany Tekst')}>
        <div className={titleClass}><span className="text-base">〰️</span> Pasek Giełdowy</div>
        <div className={descClass}>Animowany, przesuwający się tekst.</div>
      </button>
    </div>
  );
}