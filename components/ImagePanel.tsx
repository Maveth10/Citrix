import React, { useState } from 'react';
import SingleMediaPanel from './image-panels/SingleMediaPanel';
import MasksPanel from './image-panels/MasksPanel';
import ImageEffectsPanel from './image-panels/ImageEffectsPanel';
import MockupsPanel from './image-panels/MockupsPanel';
import GalleriesPanel from './image-panels/GalleriesPanel';

interface ImagePanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function ImagePanel({ handleAddBlock }: ImagePanelProps) {
  const [activeSection, setActiveSection] = useState<string | null>('single');
  const toggleSection = (section: string) => setActiveSection(prev => prev === section ? null : section);

  // 🌌 KATEGORIE OBRAZÓW (Wektorowe UI 2050) 🌌
  const categories = [
    { 
      id: 'single', 
      title: 'Pojedyncze Media', 
      component: SingleMediaPanel, 
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> 
    },
    { 
      id: 'masks', 
      title: 'Kształty i Maski', 
      component: MasksPanel, 
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> 
    },
    { 
      id: 'effects', 
      title: 'Filtry i Efekty', 
      component: ImageEffectsPanel, 
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> 
    },
    { 
      id: 'mockups', 
      title: 'Mockupy SaaS', 
      component: MockupsPanel, 
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> 
    },
    { 
      id: 'galleries', 
      title: 'Kolekcje i Galerie', 
      component: GalleriesPanel, 
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> 
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