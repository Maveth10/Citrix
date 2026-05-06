import React from 'react';

export default function TextPanel({ handleAddBlock }: any) {
  // Klasy dla głównego przycisku (bez obramowania, bo zrobimy je animowane)
  const btnWrapper = "group relative w-full text-left rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing p-[1px] overflow-hidden";
  
  // Wnętrze karty (żeby zasłonić środek krążącego lasera)
  const innerClass = "relative bg-gradient-to-br from-[#19191e]/98 to-[#0a0a0f]/98 rounded-[11px] p-4 h-full z-10 border border-white/5 group-hover:border-transparent transition-colors overflow-hidden";
  
  // Teksty wewnątrz
  const titleClass = "text-[12px] font-bold text-neutral-300 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_var(--theme-color)] flex items-center gap-2 mb-1";
  const descClass = "text-[10px] text-neutral-500 group-hover:text-neutral-300 transition-colors";

  return (
    <>
      {/* MAGIA SKANERA - Lokalne style dla wiązki */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan-beam-vertical {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        .animate-scan-beam {
          animation: scan-beam-vertical 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .scanner-glow {
          box-shadow: 0 0 15px 2px var(--theme-color), 0 0 30px var(--theme-color);
        }
      `}} />

      <div className="flex flex-col gap-4">
        
        {/* ================= SEKCJA: GŁÓWNE ================= */}
        <div className="text-[10px] font-bold text-neutral-500 mb-1 tracking-widest uppercase border-b border-white/5 pb-2">Nagłówki</div>
        
        <button className={btnWrapper} onClick={() => handleAddBlock('h1', '', 'Nagłówek H1')}>
          {/* ORBITAL SCANNER (Wirujące światło na obrzeżach) */}
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent_0%,var(--theme-color)_25%,transparent_50%)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-300"></div>
          
          <div className={innerClass}>
            {/* SWEEPING BEAM (Wiązka skanera z góry na dół) */}
            <div className="absolute left-0 right-0 h-[2px] bg-[var(--theme-color)] scanner-glow z-20 opacity-0 group-hover:opacity-80 animate-scan-beam pointer-events-none"></div>
            
            <div className={titleClass}><span className="text-xl">H1</span> Główny Tytuł</div>
            <div className={descClass}>Najważniejszy nagłówek na stronie (SEO).</div>
          </div>
        </button>

        <button className={btnWrapper} onClick={() => handleAddBlock('h2', '', 'Nagłówek H2')}>
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent_0%,var(--theme-color)_25%,transparent_50%)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-300"></div>
          <div className={innerClass}>
            <div className="absolute left-0 right-0 h-[2px] bg-[var(--theme-color)] scanner-glow z-20 opacity-0 group-hover:opacity-80 animate-scan-beam pointer-events-none"></div>
            <div className={titleClass}><span className="text-lg">H2</span> Tytuł Sekcji</div>
            <div className={descClass}>Nagłówek wspierający strukturę.</div>
          </div>
        </button>

        <button className={btnWrapper} onClick={() => handleAddBlock('h3', '', 'Nagłówek H3')}>
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent_0%,var(--theme-color)_25%,transparent_50%)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-300"></div>
          <div className={innerClass}>
            <div className="absolute left-0 right-0 h-[2px] bg-[var(--theme-color)] scanner-glow z-20 opacity-0 group-hover:opacity-80 animate-scan-beam pointer-events-none"></div>
            <div className={titleClass}><span className="text-base">H3</span> Podtytuł</div>
            <div className={descClass}>Mniejszy nagłówek do kategoryzacji treści.</div>
          </div>
        </button>


        {/* ================= SEKCJA: TREŚĆ ================= */}
        <div className="text-[10px] font-bold text-neutral-500 mb-1 mt-2 tracking-widest uppercase border-b border-white/5 pb-2">Treść</div>
        
        <button className={btnWrapper} onClick={() => handleAddBlock('p', '', 'Akapit')}>
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent_0%,var(--theme-color)_25%,transparent_50%)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-300"></div>
          <div className={innerClass}>
            <div className="absolute left-0 right-0 h-[2px] bg-[var(--theme-color)] scanner-glow z-20 opacity-0 group-hover:opacity-80 animate-scan-beam pointer-events-none"></div>
            <div className={titleClass}><span className="text-base font-serif">¶</span> Zwykły Tekst</div>
            <div className={descClass}>Podstawowy blok tekstu. Pisz do woli.</div>
          </div>
        </button>

        <button className={btnWrapper} onClick={() => handleAddBlock('alert', '', 'Cytat / Alert')}>
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent_0%,var(--theme-color)_25%,transparent_50%)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-300"></div>
          <div className={innerClass}>
            <div className="absolute left-0 right-0 h-[2px] bg-[var(--theme-color)] scanner-glow z-20 opacity-0 group-hover:opacity-80 animate-scan-beam pointer-events-none"></div>
            <div className={titleClass}><span className="text-base">💬</span> Wyróżnienie (Cytat)</div>
            <div className={descClass}>Blok tekstowy z boczną ramką. Idealny na opinie.</div>
          </div>
        </button>


        {/* ================= SEKCJA: DYNAMICZNE ================= */}
        <div className="text-[10px] font-bold text-neutral-500 mb-1 mt-2 tracking-widest uppercase border-b border-white/5 pb-2">Dynamiczne</div>

        <button className={btnWrapper} onClick={() => handleAddBlock('marquee', '', 'Przesuwany Tekst')}>
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent_0%,var(--theme-color)_25%,transparent_50%)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-300"></div>
          <div className={innerClass}>
            <div className="absolute left-0 right-0 h-[2px] bg-[var(--theme-color)] scanner-glow z-20 opacity-0 group-hover:opacity-80 animate-scan-beam pointer-events-none"></div>
            <div className={titleClass}><span className="text-base">〰️</span> Pasek Giełdowy</div>
            <div className={descClass}>Animowany, zapętlony i przesuwający się tekst.</div>
          </div>
        </button>

        <button className={btnWrapper} onClick={() => handleAddBlock('list', '', 'Lista Klasyczna')}>
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent_0%,var(--theme-color)_25%,transparent_50%)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-300"></div>
          <div className={innerClass}>
            <div className="absolute left-0 right-0 h-[2px] bg-[var(--theme-color)] scanner-glow z-20 opacity-0 group-hover:opacity-80 animate-scan-beam pointer-events-none"></div>
            <div className={titleClass}><span className="text-base">📋</span> Klasyczna Lista</div>
            <div className={descClass}>Punktowana lub numerowana lista z ikonami.</div>
          </div>
        </button>

        <button className={btnWrapper} onClick={() => handleAddBlock('faq', '', 'Sekcja FAQ')}>
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent_0%,var(--theme-color)_25%,transparent_50%)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-300"></div>
          <div className={innerClass}>
            <div className="absolute left-0 right-0 h-[2px] bg-[var(--theme-color)] scanner-glow z-20 opacity-0 group-hover:opacity-80 animate-scan-beam pointer-events-none"></div>
            <div className={titleClass}><span className="text-base">❓</span> Rozwijane FAQ</div>
            <div className={descClass}>Karty akordeonu (Pytanie i odpowiedź).</div>
          </div>
        </button>

      </div>
    </>
  );
}