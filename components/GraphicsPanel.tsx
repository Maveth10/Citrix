import React, { useState } from 'react';

interface GraphicsPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function GraphicsPanel({ handleAddBlock }: GraphicsPanelProps) {
  const [activeSection, setActiveSection] = useState<string | null>('data');

  const toggleSection = (section: string) => setActiveSection(prev => prev === section ? null : section);

  // 🌌 BAZA DANYCH Z PRZYSZŁOŚCI (2038 Vibe) 🌌
  const graphicCategories = [
    {
      id: 'data', title: '📊 Holograficzne Dane',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
      items: [
        { type: 'graphic', variant: 'quantum-counter', label: 'Quantum Odometer', desc: 'Licznik o strukturze neonowych tub jarzeniowych.' },
        { type: 'graphic', variant: 'neural-bars', label: 'Neural Outputs', desc: 'Wykresy słupkowe skanowane światłem lasera.' },
        { type: 'graphic', variant: 'reactor-core', label: 'Orbital Reactor', desc: 'Wykres kołowy zbudowany z wirujących pierścieni.' },
        { type: 'graphic', variant: 'predictive-graph', label: 'Predictive Curve', desc: 'Wykres liniowy z poświatą przewidujący trend.' },
      ]
    },
    {
      id: 'dynamic', title: '🌀 Obiekty Kinetyczne',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M16 12a4 4 0 0 1-8 0"/></svg>,
      items: [
        { type: 'graphic', variant: 'dark-matter', label: 'Dark Matter Blob', desc: 'Płynny, chromowany metal o organicznej fizyce.' },
        { type: 'graphic', variant: 'space-sonar', label: 'Deep Space Sonar', desc: 'Trójwymiarowy radar izometryczny z echem.' },
        { type: 'graphic', variant: 'synaptic-eq', label: 'Synaptic Resonance', desc: 'Wizualizator częstotliwości w formie cząstek.' },
        { type: 'graphic', variant: 'entanglement', label: 'Entanglement Net', desc: 'Połączenia neuronowe / konstelacja 3D.' },
        { type: 'graphic', variant: 'holo-blueprint', label: 'Holo Blueprint', desc: 'Szkielet ładujący się w formie skanu niebieskiego światła.' },
      ]
    },
    {
      id: 'shapes', title: '🧊 Konstrukty Przestrzenne',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
      items: [
        { type: 'graphic', variant: 'tesseract', label: 'Tesseract (Hypercube)', desc: 'Zagnieżdżony, obracający się sześcian 4D.' },
        { type: 'graphic', variant: 'spatial-matrix', label: 'Spatial Matrix', desc: 'Siatka horyzontu z perspektywą przesuwającą się w przód.' },
        { type: 'graphic', variant: 'zero-point', label: 'Zero-Point Energy', desc: 'Morfujące tło reagujące płynnym gradientem.' },
        { type: 'graphic', variant: 'cyber-divider', label: 'Plasma Divider', desc: 'Linia podziału z pulsującym jądrem światła.' },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-3 pb-10">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes smolder { 
          0%, 100% { box-shadow: inset 0 0 10px color-mix(in srgb, var(--theme-color) 5%, transparent), 0 0 5px color-mix(in srgb, var(--theme-color) 10%, transparent); border-color: color-mix(in srgb, var(--theme-color) 20%, transparent); } 
          50% { box-shadow: inset 0 0 20px color-mix(in srgb, var(--theme-color) 15%, transparent), 0 0 15px color-mix(in srgb, var(--theme-color) 15%, transparent); border-color: color-mix(in srgb, var(--theme-color) 50%, transparent); } 
        }
        .active-accordion { animation: smolder 4s ease-in-out infinite; background: linear-gradient(180deg, color-mix(in srgb, var(--theme-color) 8%, transparent) 0%, transparent 100%); color: white; border-bottom-color: transparent !important; }
      `}} />

      {graphicCategories.map((category) => {
        const isActive = activeSection === category.id;
        return (
          <div key={category.id} className="flex flex-col">
            <button 
              onClick={() => toggleSection(category.id)} 
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-500 border ${isActive ? 'active-accordion rounded-b-none' : 'bg-black/20 border-white/5 text-neutral-400 hover:bg-white/5 hover:text-white'}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="opacity-80 transition-colors" style={isActive ? { color: 'var(--theme-color)' } : {}}>{category.icon}</span>
                <span className="font-bold text-[10px] uppercase tracking-widest">{category.title}</span>
              </div>
              <span className={`text-xs transition-transform duration-300 opacity-50 ${isActive ? 'rotate-180 text-white' : 'rotate-0'}`}>▼</span>
            </button>
            
            {isActive && (
              <div className="flex flex-col gap-2 p-3 bg-[#0a0a0c]/90 border border-t-0 border-white/5 rounded-b-xl animate-in slide-in-from-top-2 duration-200 shadow-inner">
                {category.items.map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleAddBlock(item.type, item.variant, item.label)} 
                    className="group relative flex flex-col items-start p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all text-left w-full overflow-hidden"
                  >
                    <div className="absolute inset-0 border border-transparent group-hover:border-[var(--theme-color)]/50 rounded-lg pointer-events-none transition-colors duration-300"></div>
                    <span className="text-[11px] font-bold text-neutral-300 group-hover:text-white flex items-center gap-2 relative z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[var(--theme-color)] transition-colors shadow-[0_0_5px_transparent] group-hover:shadow-[0_0_8px_var(--theme-color)]"></span>
                      {item.label}
                    </span>
                    <span className="text-[9px] text-neutral-500 mt-1 pl-3.5 group-hover:text-neutral-400 relative z-10">{item.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}