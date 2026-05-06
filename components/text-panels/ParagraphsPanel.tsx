import React from 'react';

const btnWrapper = "group relative w-full text-left p-4 transition-all duration-300 bg-transparent border-b border-white/5 last:border-b-0 hover:bg-/ flex items-center gap-4 overflow-hidden";
const activeLine = "absolute left-0 top-1/4 bottom-1/4 w- bg- scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center shadow- rounded-r-full";
const iconBox = "relative w-9 h-9 rounded-lg bg-white/ border border-white/ shadow- flex items-center justify-center shrink-0 group-hover:border-/40 group-hover:bg-/10 transition-all duration-300";

export default function ParagraphsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col bg-black/10">
      
      <button onClick={() => handleAddBlock('p', 'eyebrow', 'Etykieta')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className={iconBox}><span className="text- font-bold text- uppercase tracking-widest">Eye</span></div>
        <div>
          <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Etykieta (Eyebrow)</span>
          <span className="text-[10px] text-neutral-500 block leading-tight font-light">Drobny nadtytuł sekcji.</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('p', 'lead', 'Akapit Wiodący')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className={iconBox}><span className="text-neutral-400 text-sm italic font-serif border-l border- pl-1">¶</span></div>
        <div>
          <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Akapit Wiodący (Lead)</span>
          <span className="text-[10px] text-neutral-500 block leading-tight font-light">Większy tekst wprowadzający.</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('p', 'quote', 'Cytat')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className={iconBox}><span className="text-neutral-400 text-base font-serif">"</span></div>
        <div>
          <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Wyróżnienie (Cytat)</span>
          <span className="text-[10px] text-neutral-500 block leading-tight font-light">Z boczną ramką. Idealne na opinie.</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('p', '', 'Zwykły Akapit')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className={iconBox}><span className="text-neutral-500 text-sm">≡</span></div>
        <div>
          <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Zwykły Akapit</span>
          <span className="text-[10px] text-neutral-500 block leading-tight font-light">Standardowy blok tekstu.</span>
        </div>
      </button>

    </div>
  );
}