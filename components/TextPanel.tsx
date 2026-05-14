import React, { useState } from 'react';
import HeadingsPanel from './text-panels/HeadingsPanel';
import ParagraphsPanel from './text-panels/ParagraphsPanel';
import InsertsPanel from './text-panels/InsertsPanel';
import DisplayEffectsPanel from './text-panels/DisplayEffectsPanel';
import KineticTypographyPanel from './text-panels/KineticTypographyPanel';

interface TextPanelProps { handleAddBlock: (type: string, variant: string, label: string) => void; }

export default function TextPanel({ handleAddBlock }: TextPanelProps) {
  const [activeSection, setActiveSection] = useState<string | null>('headers');
  const toggleSection = (section: string) => setActiveSection(prev => prev === section ? null : section);

  // 🌌 KATEGORIE 2050 (HUD Interface, Zero Emojis) 🌌
  const categories = [
    { 
      id: 'headers', 
      title: 'Węzły Główne (Headings)', 
      component: HeadingsPanel, 
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="12" y1="9" x2="12" y2="15"/></svg> 
    },
    { 
      id: 'paragraphs', 
      title: 'Struktury Danych (Body)', 
      component: ParagraphsPanel, 
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="3" y2="12"/><line x1="15" y1="18" x2="3" y2="18"/></svg> 
    },
    { 
      id: 'inserts', 
      title: 'Mikro-Interfejsy (HUD)', 
      component: InsertsPanel, 
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> 
    },
    { 
      id: 'effects', 
      title: 'Renderowanie (Effects)', 
      component: DisplayEffectsPanel, 
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> 
    },
    { 
      id: 'kinetic', 
      title: 'Fizyka i Ruch (Kinetic)', 
      component: KineticTypographyPanel, 
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M16 12a4 4 0 0 1-8 0"/></svg> 
    }
  ];

  return (
    <div className="flex flex-col gap-3 pb-10">
      {/* Luksusowy efekt tlenia się aktywnego panelu */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes smolder { 
          0%, 100% { box-shadow: inset 0 0 10px color-mix(in srgb, var(--theme-color) 5%, transparent), 0 0 5px color-mix(in srgb, var(--theme-color) 10%, transparent); border-color: color-mix(in srgb, var(--theme-color) 20%, transparent); } 
          50% { box-shadow: inset 0 0 20px color-mix(in srgb, var(--theme-color) 15%, transparent), 0 0 15px color-mix(in srgb, var(--theme-color) 15%, transparent); border-color: color-mix(in srgb, var(--theme-color) 50%, transparent); } 
        }
        .active-accordion { animation: smolder 4s ease-in-out infinite; background: linear-gradient(180deg, color-mix(in srgb, var(--theme-color) 8%, transparent) 0%, transparent 100%); color: white; border-bottom-color: transparent !important; }
      `}} />

      {categories.map(({ id, title, icon, component: Component }) => {
        const isActive = activeSection === id;
        return (
          <div key={id} className="flex flex-col">
            <button 
              onClick={() => toggleSection(id)} 
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-500 border ${isActive ? 'active-accordion rounded-b-none border-t-0' : 'bg-black/20 border-white/5 text-neutral-400 hover:bg-white/5 hover:text-white'}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="opacity-80 transition-colors" style={isActive ? { color: 'var(--theme-color)' } : {}}>{icon}</span>
                <span className="font-bold text-[10px] uppercase tracking-widest">{title}</span>
              </div>
              <span className={`text-xs transition-transform duration-300 opacity-50 ${isActive ? 'rotate-180 text-white' : 'rotate-0'}`}>▼</span>
            </button>
            
            {isActive && (
              <div className="flex flex-col bg-[#050508]/80 backdrop-blur-md border border-t-0 border-white/5 rounded-b-xl animate-in slide-in-from-top-2 duration-200 overflow-hidden shadow-[inset_0_20px_20px_-20px_rgba(0,0,0,0.5)]">
                <Component handleAddBlock={handleAddBlock} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}