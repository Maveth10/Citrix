import React from 'react';

export default function TextPanel({ handleAddBlock }: any) {
  // Baza przycisku: Szronione szkło, wyraźnie odcinające się od ciemnego tła
  const btnWrapper = "group relative w-full text-left rounded-xl p-4 transition-all duration-300 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 hover:bg-white/[0.08] hover:border-white/10 hover:shadow-lg overflow-hidden";
  
  // Efekt oświetlenia z prawej strony (Neon Edge) + miękka poświata wchodząca do środka
  const neonEdge = "absolute right-0 top-0 bottom-0 w-[3px] bg-[var(--theme-color)] shadow-[0_0_15px_var(--theme-color)] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20";
  const ambientGlow = "absolute right-0 top-1/2 -translate-y-1/2 w-32 h-full bg-[var(--theme-color)] blur-[40px] opacity-0 group-hover:opacity-20 transition-all duration-500 z-0 pointer-events-none";
  
  // Teksty
  const titleClass = "relative text-[12px] font-bold text-neutral-300 transition-colors duration-300 group-hover:text-white flex items-center gap-2 mb-1 z-10";
  const descClass = "relative text-[10px] text-neutral-500 group-hover:text-neutral-400 transition-colors z-10";

  return (
    <div className="flex flex-col gap-3">
      
      {/* ================= SEKCJA: NAGŁÓWKI ================= */}
      <div className="text-[10px] font-bold text-neutral-500 mb-1 tracking-widest uppercase border-b border-white/5 pb-2">Nagłówki</div>
      
      <button className={btnWrapper} onClick={() => handleAddBlock('h1', '', 'Nagłówek H1')}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className={titleClass}><span className="text-xl">H1</span> Główny Tytuł</div>
        <div className={descClass}>Najważniejszy nagłówek na stronie (SEO).</div>
      </button>

      <button className={btnWrapper} onClick={() => handleAddBlock('h2', '', 'Nagłówek H2')}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className={titleClass}><span className="text-lg">H2</span> Tytuł Sekcji</div>
        <div className={descClass}>Nagłówek wspierający strukturę całej sekcji.</div>
      </button>

      <button className={btnWrapper} onClick={() => handleAddBlock('h3', 'gradient', 'Magiczny Gradient')}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className={titleClass}><span className="text-base text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">✨</span> Magiczny Gradient</div>
        <div className={descClass}>Wielokolorowy, wyróżniający się tekst nagłówka.</div>
      </button>

      {/* ================= SEKCJA: TREŚĆ ================= */}
      <div className="text-[10px] font-bold text-neutral-500 mb-1 mt-2 tracking-widest uppercase border-b border-white/5 pb-2">Akapity i Wyróżnienia</div>
      
      <button className={btnWrapper} onClick={() => handleAddBlock('p', '', 'Akapit')}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className={titleClass}><span className="text-base font-serif">¶</span> Zwykły Tekst</div>
        <div className={descClass}>Podstawowy blok tekstu. Czytelny i lekki.</div>
      </button>

      <button className={btnWrapper} onClick={() => handleAddBlock('p', 'highlight', 'Wyróżniony Tekst')}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className={titleClass}><span className="text-base">🖍️</span> Podświetlony Tekst</div>
        <div className={descClass}>Zwraca uwagę tłem przypominającym marker.</div>
      </button>

      {/* ================= SEKCJA: ALERTY ================= */}
      <div className="text-[10px] font-bold text-neutral-500 mb-1 mt-2 tracking-widest uppercase border-b border-white/5 pb-2">Komunikaty (Bannery)</div>

      <button className={btnWrapper} onClick={() => handleAddBlock('alert', 'success', 'Ramka Sukcesu')}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className={titleClass}><span className="text-base">✅</span> Ramka Sukcesu</div>
        <div className={descClass}>Zielony banner potwierdzający akcję / korzyść.</div>
      </button>

      <button className={btnWrapper} onClick={() => handleAddBlock('alert', 'warning', 'Ramka Ostrzeżenia')}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className={titleClass}><span className="text-base">⚠️</span> Ramka Ostrzeżenia</div>
        <div className={descClass}>Żółty banner dla ważnych uwag i notatek.</div>
      </button>

      {/* ================= SEKCJA: DYNAMICZNE ================= */}
      <div className="text-[10px] font-bold text-neutral-500 mb-1 mt-2 tracking-widest uppercase border-b border-white/5 pb-2">Dynamiczne</div>

      <button className={btnWrapper} onClick={() => handleAddBlock('marquee', '', 'Pasek Giełdowy')}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className={titleClass}><span className="text-base">〰️</span> Pasek Giełdowy</div>
        <div className={descClass}>Automatycznie przesuwający się poziomy tekst.</div>
      </button>

    </div>
  );
}