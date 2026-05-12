import React, { useState } from 'react';

interface TextPanelProps { handleAddBlock: (type: string, variant: string, label: string) => void; }

export default function TextPanel({ handleAddBlock }: TextPanelProps) {
  const [activeSection, setActiveSection] = useState<string | null>('headers');
  const toggleSection = (section: string) => setActiveSection(prev => prev === section ? null : section);

  // 💎 CZYSTA ELEGANCJA I FUNKCJONALNOŚĆ 💎
  const textCategories = [
    {
      id: 'headers', title: '👑 Tytuły (Headings)',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 12h16M4 4v16M20 4v16"/></svg>,
      items: [
        { type: 'h1', variant: 'hero', label: 'Hero Headline', desc: 'Masywny, ciasny, perfekcyjny tytuł główny.' },
        { type: 'h1', variant: 'editorial', label: 'Editorial Serif', desc: 'Luksusowy tytuł prosto z magazynu mody.' },
        { type: 'h2', variant: 'metallic', label: 'Metallic Gold', desc: 'Subtelny, drogi złoty gradient.' },
        { type: 'h3', variant: 'kicker', label: 'Kicker (Eyebrow)', desc: 'Mały, szeroko rozstrzelony tekst nad tytułem.' },
      ]
    },
    {
      id: 'paragraphs', title: '📰 Akapity (Body)',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>,
      items: [
        { type: 'p', variant: 'body', label: 'Perfect Body', desc: 'Akapit z idealną czytelnością i linią.' },
        { type: 'p', variant: 'lead', label: 'Lead Paragraph', desc: 'Nieco większy tekst wprowadzający.' },
        { type: 'p', variant: 'quote', label: 'Elegant Quote', desc: 'Cytat z subtelną linią boczną i italikiem.' },
        { type: 'p', variant: 'muted', label: 'Muted Text', desc: 'Drobny, przygaszony tekst poboczny.' },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-3 pb-10">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes themeBreathe { 0%, 100% { border-color: color-mix(in srgb, var(--theme-color) 30%, transparent); } 50% { border-color: color-mix(in srgb, var(--theme-color) 80%, transparent); } }
        .active-theme-breathe { animation: themeBreathe 3s ease-in-out infinite; background-color: color-mix(in srgb, var(--theme-color) 5%, transparent); color: var(--theme-color); }
      `}} />
      {textCategories.map((category) => {
        const isActive = activeSection === category.id;
        return (
          <div key={category.id} className="flex flex-col">
            <button onClick={() => toggleSection(category.id)} className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 border ${isActive ? 'active-theme-breathe rounded-b-none' : 'bg-black/20 border-white/5 text-neutral-400 hover:bg-white/5 hover:text-white'}`}>
              <div className="flex items-center gap-2"><span style={isActive ? { color: 'var(--theme-color)' } : {}}>{category.icon}</span><span className="font-bold text-[10px] uppercase tracking-widest">{category.title}</span></div>
              <span className={`text-xs transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>▼</span>
            </button>
            {isActive && (
              <div className="flex flex-col gap-2 p-3 bg-[#0a0a0c]/80 border border-t-0 border-white/5 rounded-b-xl animate-in slide-in-from-top-2 duration-200">
                {category.items.map((item, idx) => (
                  <button key={idx} onClick={() => handleAddBlock(item.type, item.variant, item.label)} className="group relative flex flex-col items-start p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all text-left w-full">
                    <span className="text-[11px] font-bold text-neutral-300 group-hover:text-white flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[var(--theme-color)]"></span>{item.label}</span>
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