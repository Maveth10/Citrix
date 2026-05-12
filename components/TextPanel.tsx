import React, { useState } from 'react';

interface TextPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function TextPanel({ handleAddBlock }: TextPanelProps) {
  const [activeSection, setActiveSection] = useState<string | null>('headers');

  const toggleSection = (section: string) => {
    setActiveSection(prev => prev === section ? null : section);
  };

  // 🔥 PRZYWRÓCONE WSZYSTKIE ZAAWANSOWANE WARIANTY KLOCKÓW 🔥
  const textCategories = [
    {
      id: 'headers',
      title: 'Nagłówki (Headers)',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16M4 4v16M20 4v16"/></svg>,
      items: [
        { type: 'h1', variant: 'classic', label: 'H1 - Główny Tytuł', desc: 'Najważniejszy nagłówek na stronie' },
        { type: 'h2', variant: 'classic', label: 'H2 - Podtytuł', desc: 'Standardowy nagłówek sekcji' },
        { type: 'h1', variant: 'gradient', label: 'H1 - Gradient Pro', desc: 'Tytuł z przejściem tonalnym' },
        { type: 'h1', variant: 'outline', label: 'H1 - Outline', desc: 'Nowoczesny napis konturowy' },
        { type: 'h1', variant: 'kinetic', label: 'H1 - Kinetyczny', desc: 'Animowany, pływający tekst (Marquee)' },
        { type: 'h2', variant: 'typewriter', label: 'H2 - Maszyna', desc: 'Efekt pisania na maszynie' },
      ]
    },
    {
      id: 'paragraphs',
      title: 'Akapity (Paragraphs)',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>,
      items: [
        { type: 'p', variant: 'classic', label: 'Zwykły Akapit', desc: 'Standardowy blok tekstu' },
        { type: 'p', variant: 'notification', label: 'Powiadomienie z Plakietką', desc: 'Pasek info z pulsującą odznaką' },
        { type: 'p', variant: 'lead', label: 'Tekst Wiodący (Lead)', desc: 'Powiększony, wyróżniony akapit' },
        { type: 'p', variant: 'columns', label: 'Dwie Kolumny', desc: 'Długi tekst rozbity na 2 szpalty' },
      ]
    },
    {
      id: 'special',
      title: 'Elementy Specjalne',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25-.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>,
      items: [
        { type: 'p', variant: 'eyebrow', label: 'Etykieta (Eyebrow)', desc: 'Mały napis (Kicker) nad głównym tytułem' },
        { type: 'p', variant: 'quote', label: 'Cytat (Blockquote)', desc: 'Stylowy blok z wyróżnionym cytatem' },
        { type: 'p', variant: 'badge', label: 'Odznaka (Badge)', desc: 'Kolorowa "pigułka" z tekstem' },
        { type: 'p', variant: 'code', label: 'Blok Kodu', desc: 'Monospacowany tekst na ciemnym tle' },
        { type: 'p', variant: 'link', label: 'Odnośnik', desc: 'Zwykły link tekstowy z podkreśleniem' },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* Dynamiczna animacja korzystająca z var(--theme-color) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes themeBreathe {
          0%, 100% { 
            box-shadow: 0 0 10px color-mix(in srgb, var(--theme-color) 10%, transparent), 
                        inset 0 0 5px color-mix(in srgb, var(--theme-color) 5%, transparent); 
            border-color: color-mix(in srgb, var(--theme-color) 30%, transparent);
          }
          50% { 
            box-shadow: 0 0 25px color-mix(in srgb, var(--theme-color) 50%, transparent), 
                        inset 0 0 10px color-mix(in srgb, var(--theme-color) 20%, transparent); 
            border-color: color-mix(in srgb, var(--theme-color) 80%, transparent);
          }
        }
        .active-theme-breathe {
          animation: themeBreathe 3s ease-in-out infinite;
          background-color: color-mix(in srgb, var(--theme-color) 5%, transparent);
          color: var(--theme-color);
        }
      `}} />

      {textCategories.map((category) => {
        const isActive = activeSection === category.id;

        return (
          <div key={category.id} className="flex flex-col">
            
            <button
              onClick={() => toggleSection(category.id)}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 border ${
                isActive 
                  ? 'active-theme-breathe rounded-b-none' 
                  : 'bg-black/20 border-white/5 text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="transition-colors duration-300" style={isActive ? { color: 'var(--theme-color)' } : {}}>
                  {category.icon}
                </span>
                <span className="font-bold text-[10px] uppercase tracking-widest">{category.title}</span>
              </div>
              <span className={`text-xs transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </span>
            </button>

            {isActive && (
              <div className="flex flex-col gap-2 p-3 bg-[#0a0a0c]/80 border border-t-0 border-white/5 rounded-b-xl animate-in slide-in-from-top-2 duration-200">
                {category.items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddBlock(item.type, item.variant, item.label)}
                    className="group relative flex flex-col items-start p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all text-left w-full overflow-hidden"
                  >
                    {/* Delikatne podświetlenie ramki klocka przy najechaniu za pomocą koloru motywu */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-solid rounded-lg pointer-events-none transition-colors duration-300" style={{ borderColor: 'color-mix(in srgb, var(--theme-color) 50%, transparent)' }}></div>

                    <span className="text-[11px] font-bold text-neutral-300 group-hover:text-white transition-colors flex items-center gap-2 relative z-10">
                      {/* Kropka która zyskuje kolor motywu przy najeździe */}
                      <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 bg-white/20 group-hover:shadow-[0_0_8px_var(--theme-color)]" style={{ backgroundColor: 'var(--theme-color)' }}></span>
                      {item.label}
                    </span>
                    <span className="text-[9px] text-neutral-500 mt-1 pl-3.5 group-hover:text-neutral-400 transition-colors relative z-10">
                      {item.desc}
                    </span>
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