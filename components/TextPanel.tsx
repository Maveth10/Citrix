import React, { useState } from 'react';

interface TextPanelProps { handleAddBlock: (type: string, variant: string, label: string) => void; }

export default function TextPanel({ handleAddBlock }: TextPanelProps) {
  const [activeSection, setActiveSection] = useState<string | null>('headers');
  const toggleSection = (section: string) => setActiveSection(prev => prev === section ? null : section);

  // 💎 POTĘŻNA BAZA TYPOGRAFII I EFEKTÓW (Ponad 30 wariantów) 💎
  const textCategories = [
    {
      id: 'headers', title: '👑 Tytuły (Hero & Headings)',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 12h16M4 4v16M20 4v16"/></svg>,
      items: [
        { type: 'h1', variant: 'hero', label: 'Hero Headline', desc: 'Masywny, klasyczny tytuł główny o wysokim kontraście.' },
        { type: 'h1', variant: 'swiss-minimal', label: 'Swiss Minimalist', desc: 'Ultranowoczesny, surowy tytuł w stylu Helvetica.' },
        { type: 'h1', variant: 'neo-brutal', label: 'Neo-Brutal Headline', desc: 'Agresywny tytuł z twardym, czarnym cieniem.' },
        { type: 'h1', variant: 'editorial', label: 'Editorial Serif', desc: 'Elegancki tytuł szeryfowy, prosto z Vogue.' },
        { type: 'h1', variant: 'metallic', label: 'Metallic Gold', desc: 'Luksusowy tytuł ze szczotkowanym, złotym gradientem.' },
        { type: 'h1', variant: 'holographic', label: 'Holographic Foil', desc: 'Tytuł mieniący się płynnie wszystkimi kolorami.' },
        { type: 'h1', variant: 'aurora-text', label: 'Aurora Mesh', desc: 'Tekst z płynnym, holograficznym gradientem w tle.' },
        { type: 'h1', variant: 'outline', label: 'Stroke Outline', desc: 'Nowoczesny tytuł bazujący wyłącznie na konturze.' },
        { type: 'h1', variant: 'engraved', label: 'Embossed Engraved', desc: 'Luksusowy efekt tekstu wyrytego w tle.' },
        { type: 'h2', variant: 'kicker', label: 'Kicker (Eyebrow)', desc: 'Drobny, rozstrzelony nadtytuł budujący hierarchię.' },
      ]
    },
    {
      id: 'paragraphs', title: '📰 Akapity i Forma',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>,
      items: [
        { type: 'p', variant: 'body', label: 'Perfect Body', desc: 'Standardowy tekst z idealnie wyliczoną czytelnością.' },
        { type: 'p', variant: 'lead', label: 'Lead Paragraph', desc: 'Nieco większy i lżejszy tekst wprowadzający.' },
        { type: 'p', variant: 'columns', label: 'Układ Kolumnowy', desc: 'Tekst automatycznie łamany na 2 proporcjonalne kolumny.' },
        { type: 'p', variant: 'magazine-block', label: 'Magazine Block', desc: 'Wyjustowany blok tekstu o ścisłych marginesach.' },
        { type: 'p', variant: 'muted', label: 'Muted Legal', desc: 'Drobny, przygaszony tekst poboczny lub prawny.' },
      ]
    },
    {
      id: 'quotes', title: '💬 Cytaty i Wyróżnienia',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
      items: [
        { type: 'p', variant: 'quote', label: 'Minimal Quote', desc: 'Elegancki cytat z subtelną linią boczną i italikiem.' },
        { type: 'p', variant: 'pro-quote', label: 'Testimonial Block', desc: 'Rozbudowany blok cytatu z wyodrębnionym autorem.' },
        { type: 'p', variant: 'pull-quote', label: 'Big Pull Quote', desc: 'Wyśrodkowany cytat z gigantycznymi znakami cudzysłowu.' },
        { type: 'p', variant: 'illuminated-cap', label: 'Illuminated Initial', desc: 'Akapit z rzeźbionym, zdobionym inicjałem (Drop Cap).' },
        { type: 'p', variant: 'highlight', label: 'Marker Highlight', desc: 'Zaznaczenie tekstu (realistyczny pędzel markera).' },
      ]
    },
    {
      id: 'effects', title: '🎬 Display & Efekty Specjalne',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>,
      items: [
        { type: 'h1', variant: 'blackmirror', label: 'Digital Static', desc: 'Kinematograficzny efekt szumu i interferencji sygnału.' },
        { type: 'h2', variant: 'glitch', label: 'Cyber Glitch', desc: 'Agresywny efekt zepsutego, trzęsącego się ekranu.' },
        { type: 'h2', variant: 'flicker-neon', label: 'Cinematic Neon', desc: 'Świecący napis z realistycznym efektem przepięcia.' },
        { type: 'h1', variant: 'masked-liquid', label: 'Fluid Typography', desc: 'Tytuł wypełniony animowaną, płynną maską.' },
        { type: 'h2', variant: 'glass-text', label: 'Frosted Glass Text', desc: 'Efekt oszronionego szkła wyciętego w tekście.' },
        { type: 'h1', variant: 'anaglyph', label: 'Anaglyph Retro 3D', desc: 'Klasyczne rozszczepienie kolorów (Red/Cyan).' },
        { type: 'p', variant: 'typewriter', label: 'Terminal Console', desc: 'Efekt pisania na maszynie z migającym kursorem.' },
        { type: 'h2', variant: 'arcade', label: 'Arcade Pixel', desc: 'Gamingowy styl retro rodem z lat 80.' },
      ]
    },
    {
      id: 'kinetic', title: '🌀 Interaktywne (Kinetic)',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M16 12a4 4 0 0 1-8 0"/></svg>,
      items: [
        { type: 'h1', variant: 'marquee-text', label: 'Infinite Marquee', desc: 'Nieskończony, animowany pasek przesuwający tekst.' },
        { type: 'h1', variant: 'sliced', label: 'Kinetic Split', desc: 'Tytuł rozcinający się w poziomie przy najechaniu.' },
        { type: 'h2', variant: 'censored', label: 'Censored Reveal', desc: 'Tajne akta – tekst ukryty pod paskiem, widoczny na hover.' },
        { type: 'h2', variant: 'hover-reveal', label: 'Secret Reveal', desc: 'Zamazany tekst, który wyostrza się po najechaniu.' },
        { type: 'p', variant: 'text-circle', label: 'Rotating Badge', desc: 'Tekst obracający się w idealnym okręgu (pieczęć).' },
      ]
    },
    {
      id: 'ui', title: '🛠️ Użytkowe i UI',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 3v18M15 3v18"/></svg>,
      items: [
        { type: 'p', variant: 'badge', label: 'Plakietka (Badge)', desc: 'Wyróżniona etykietka promocyjna, np. "NOWOŚĆ".' },
        { type: 'p', variant: 'status-indicator', label: 'Status Dot', desc: 'Pulsująca kropka z tekstem oznaczająca status systemu.' },
        { type: 'p', variant: 'tag-cloud', label: 'Chip / Tag', desc: 'Mały, zaokrąglony tag do oznaczania kategorii.' },
        { type: 'p', variant: 'kbd', label: 'Klawisz (KBD)', desc: 'Wizualizacja wciśniętego klawisza z klawiatury.' },
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
              <div className="flex items-center gap-2">
                <span style={isActive ? { color: 'var(--theme-color)' } : {}}>{category.icon}</span>
                <span className="font-bold text-[10px] uppercase tracking-widest">{category.title}</span>
              </div>
              <span className={`text-xs transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>▼</span>
            </button>
            
            {isActive && (
              <div className="flex flex-col gap-2 p-3 bg-[#0a0a0c]/80 border border-t-0 border-white/5 rounded-b-xl animate-in slide-in-from-top-2 duration-200">
                {category.items.map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleAddBlock(item.type, item.variant, item.label)} 
                    className="group relative flex flex-col items-start p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all text-left w-full"
                  >
                    <span className="text-[11px] font-bold text-neutral-300 group-hover:text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[var(--theme-color)] transition-colors"></span>
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