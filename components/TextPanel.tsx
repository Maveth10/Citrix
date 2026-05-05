import React from 'react';

interface TextPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function TextPanel({ handleAddBlock }: TextPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      
      {/* SEKCJA: MARKOWE NAGŁÓWKI */}
      <div>
        <h4 className="text-[10px] font-bold text-neutral-500 mb-3 uppercase tracking-widest">Markowe Nagłówki</h4>
        <div className="flex flex-col gap-2">
          
          <button onClick={() => handleAddBlock('p', 'eyebrow', 'Etykieta')} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all text-left shadow-sm">
            <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase">Zacznij Tutaj (Eyebrow)</span>
          </button>
          
          <button onClick={() => handleAddBlock('h1', 'classic', 'Hero H1')} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all text-left shadow-sm">
            <span className="text-xl font-black text-white leading-none tracking-tight">Potężny Hero H1</span>
          </button>

          <button onClick={() => handleAddBlock('h1', 'gradient', 'Gradient H1')} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all text-left shadow-sm">
            <span className="text-xl font-black leading-none bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tight">Magiczny Gradient</span>
          </button>

          <button onClick={() => handleAddBlock('h1', 'outline', 'Outline H1')} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all text-left shadow-sm">
            <span className="text-xl font-black leading-none text-transparent tracking-tight" style={{ WebkitTextStroke: '1px white' }}>Pusty w Środku (Outline)</span>
          </button>

          <button onClick={() => handleAddBlock('h1', 'highlight', 'H1 Wyróżnik')} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all text-left shadow-sm">
            <span className="text-xl font-black leading-none text-white tracking-tight">Kluczowy <span style={{ background: 'linear-gradient(120deg, rgba(253,224,71,0.8) 0%, rgba(253,224,71,0.8) 100%) no-repeat', backgroundSize: '100% 35%', backgroundPosition: '0 90%' }}>Wyróżnik</span></span>
          </button>
          
          <button onClick={() => handleAddBlock('h2', 'classic', 'Podtytuł H2')} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all text-left shadow-sm mt-2">
            <span className="text-lg font-bold text-neutral-200 leading-none tracking-tight">Mocny Podtytuł H2</span>
          </button>
        </div>
      </div>

      <hr className="border-white/5" />

      {/* SEKCJA: AKAPITY I TREŚĆ */}
      <div>
        <h4 className="text-[10px] font-bold text-neutral-500 mb-3 uppercase tracking-widest">Akapity i Treść</h4>
        <div className="flex flex-col gap-2">
          
          <button onClick={() => handleAddBlock('p', 'lead', 'Akapit Lead')} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all text-left shadow-sm">
            <span className="text-sm text-neutral-400 leading-snug block">Większy akapit wprowadzający (Lead), idealny pod główny nagłówek.</span>
          </button>
          
          <button onClick={() => handleAddBlock('p', 'classic', 'Zwykły Tekst')} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all text-left shadow-sm">
            <span className="text-xs text-neutral-500 leading-snug block">Standardowy akapit tekstu, mniejszy rozmiar, wyższa czytelność do długich bloków.</span>
          </button>

          <button onClick={() => handleAddBlock('p', 'quote', 'Cytat')} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all text-left shadow-sm">
            <span className="text-xs italic text-neutral-400 border-l-2 border-blue-500 pl-3 block">"Wybitny design to taki, z którego nie można już nic zabrać."</span>
          </button>
          
        </div>
      </div>

    </div>
  );
}