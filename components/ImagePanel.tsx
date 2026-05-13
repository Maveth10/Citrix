import React, { useState } from 'react';

interface ImagePanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function ImagePanel({ handleAddBlock }: ImagePanelProps) {
  const [activeTab, setActiveTab] = useState<string | null>('single');
  const toggleTab = (tab: string) => setActiveTab(prev => prev === tab ? null : tab);

  // 💎 PROFESJONALNA BAZA OBRAZÓW I GALERII (Bez Emojis) 💎
  const imageCategories = [
    {
      id: 'single', title: 'Pojedyncze Media',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
      items: [
        { type: 'img', variant: 'classic', label: 'Uniwersalny Obraz', desc: 'Pełna obsługa JPG, PNG, WebP.' },
        { type: 'img', variant: 'rounded', label: 'Soft Premium', desc: 'Eleganckie zaokrąglenia i miękki cień.' },
        { type: 'img', variant: 'avatar', label: 'Okrągły Avatar', desc: 'Idealny do profili, opinii i cytatów.' },
        { type: 'img', variant: 'polaroid', label: 'Retro Polaroid', desc: 'Biała ramka z miejscem na podpis.' },
        { type: 'img', variant: 'glass-card', label: 'Szklana Karta (Glass)', desc: 'Rozmyte tło pod zdjęciem, 100% premium.' },
      ]
    },
    {
      id: 'masks', title: 'Kształty i Maski',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="9" r="7"/><circle cx="15" cy="15" r="7"/></svg>,
      items: [
        { type: 'img', variant: 'mask-blob', label: 'Płynny Blob', desc: 'Organiczny, animowany kształt wektorowy.' },
        { type: 'img', variant: 'mask-arch', label: 'Elegancki Łuk', desc: 'Zaokrąglona góra, idealne do świata mody.' },
        { type: 'img', variant: 'mask-diamond', label: 'Diament (Romb)', desc: 'Zdjęcie obrócone o 45 stopni w kształt rombu.' },
        { type: 'img', variant: 'mask-ticket', label: 'Bilet (Ticket)', desc: 'Zdjęcie wcięte po bokach jak bilet na event.' },
      ]
    },
    {
      id: 'effects', title: 'Efekty i Interakcje',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
      items: [
        { type: 'img', variant: 'effect-glitch', label: 'Cyberpunk Glitch', desc: 'Agresywny efekt zakłóceń (RGB Split) przy hoverze.' },
        { type: 'img', variant: 'effect-duotone', label: 'Duo-Tone Filter', desc: 'Nowoczesny filtr dwukolorowy z sepią.' },
        { type: 'img', variant: 'effect-reveal', label: 'Hover Reveal', desc: 'Czarno-białe zdjęcie, które nabiera kolorów po najechaniu.' },
        { type: 'img', variant: 'effect-zoom', label: 'Cinematic Zoom', desc: 'Zdjęcie powoli i płynnie przybliża się po najechaniu.' },
      ]
    },
    {
      id: 'mockups', title: 'Mockupy SaaS',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
      items: [
        { type: 'container', variant: 'mockup-browser', label: 'Okno Przeglądarki', desc: 'Zrzut ekranu zamknięty w systemowej ramce macOS.' },
        { type: 'container', variant: 'mockup-mobile', label: 'Smartfon (Mobile)', desc: 'Elegancka, zaokrąglona ramka telefonu dla UI.' },
        { type: 'container', variant: 'mockup-credit-card', label: 'Karta Kredytowa 3D', desc: 'Holograficzna, interaktywna karta bankowa reagująca na mysz.' },
      ]
    },
    {
      id: 'galleries', title: 'Kolekcje i Galerie',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
      items: [
        { type: 'grid', variant: 'gallery-grid', label: 'Klasyczna Siatka', desc: 'Równy, 3-kolumnowy układ galerii zdjęć.' },
        { type: 'container', variant: 'gallery-bento', label: 'Bento Grid', desc: 'Układ asymetryczny popularny w systemach Apple.' },
        { type: 'container', variant: 'gallery-slider', label: 'Karuzela (Scroll)', desc: 'Poziomy slider obrazów ze znikającym paskiem.' },
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
      
      {imageCategories.map((category) => {
        const isActive = activeTab === category.id;
        return (
          <div key={category.id} className="flex flex-col">
            <button 
              onClick={() => toggleTab(category.id)} 
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
                    className="group relative flex flex-col items-start p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all text-left w-full"
                  >
                    <span className="text-[11px] font-bold text-neutral-300 group-hover:text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[var(--theme-color)] transition-colors shadow-[0_0_5px_transparent] group-hover:shadow-[0_0_8px_var(--theme-color)]"></span>
                      {item.label}
                    </span>
                    <span className="text-[9px] text-neutral-500 mt-1 pl-3.5 group-hover:text-neutral-400">{item.desc}</span>
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