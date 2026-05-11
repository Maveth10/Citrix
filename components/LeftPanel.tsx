import React from 'react';
import { CATEGORIES, renderCategoryIcon, generateTemplate } from '../utils/editorConfig';
import DOMNavigator from './DOMNavigator'; // <-- IMPORTUJEMY NAWIGATOR
import TextPanel from './TextPanel';
import ImagePanel from './ImagePanel';
import ButtonPanel from './ButtonPanel';
import GraphicsPanel from './GraphicsPanel';
import LayoutPanel from './LayoutPanel';
import VideoPanel from './VideoPanel';
import FormPanel from './FormPanel';
import MenuPanel from './MenuPanel';
import PopupPanel from './PopupPanel';
import ListPanel from './ListPanel';
import SocialPanel from './SocialPanel';
import EmbedPanel from './EmbedPanel';

export default function LeftPanel({
  leftTab, setLeftTab, addCategory, setAddCategory, blocks, pageSlug,
  handleAddBlock, handleInsertTemplate, handleExportJSON, handleImportJSON,
  activeId, setActiveId, setIsEditing, hiddenBlocks, toggleBlockVisibility, moveBlockTree // <--- Dodane prop-sy do Nawigatora
}: any) {
  
  const activeCategoryData = CATEGORIES.find(c => c.id === addCategory);

  return (
    <div 
      className="flex h-full relative z-50 transition-all duration-300"
      onMouseLeave={() => setAddCategory(null)}
    >
      <aside className="w-[110px] bg-[rgba(8,8,12,0.6)] backdrop-blur-[24px] saturate-[150%] border-r border-white/5 flex flex-col items-center py-6 gap-4 shrink-0 overflow-y-auto scrollbar-hide relative shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-50">
        
        <button 
          onClick={() => { setLeftTab(leftTab === 'pages' ? null : 'pages'); setAddCategory(null); }} 
          className="relative w-[76px] h-12 rounded-[14px] flex items-center justify-center text-neutral-400 transition-all duration-300 z-30 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10 hover:scale-105"
          title="Strony"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
        </button>

        <button 
          onClick={() => { setLeftTab(leftTab === 'layers' ? null : 'layers'); setAddCategory(null); }} 
          className="relative w-[76px] h-12 rounded-[14px] flex items-center justify-center text-neutral-400 transition-all duration-300 z-30 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10 hover:scale-105"
          title="DOM Navigator"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        </button>

        <div className="w-12 h-px bg-white/10 my-1 z-30"></div>

        {CATEGORIES.map(cat => {
          const isActive = addCategory === cat.id;
          return (
            <button 
              key={cat.id} 
              onMouseEnter={() => { setAddCategory(cat.id); setLeftTab(null); }} 
              onClick={() => { setAddCategory(isActive ? null : cat.id); setLeftTab(null); }} 
              className={`cyber-kafel w-[76px] h-[76px] flex items-center justify-center transition-all duration-300 z-30 ${isActive ? 'active scale-105 text-white' : 'text-neutral-500 hover:text-white hover:scale-105'}`}
            >
              <div 
                className={`transition-all duration-300 ${isActive ? 'scale-110' : ''}`}
                style={isActive ? { color: 'var(--theme-color)', filter: 'drop-shadow(0 0 8px var(--theme-color))' } : {}}
              >
                {renderCategoryIcon(cat.id)}
              </div>
            </button>
          );
        })}
      </aside>

      <div className="relative z-40 h-full flex">
        
        {leftTab === 'pages' && (
          <div className="w-64 bg-[rgba(8,8,12,0.6)] backdrop-blur-[24px] saturate-[150%] h-full flex flex-col animate-in slide-in-from-left-4 relative overflow-hidden border-r border-white/5 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: 'var(--theme-color)', boxShadow: '0 0 15px var(--theme-color)' }}></div>
            <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center relative z-10">
              <h2 className="font-bold text-[11px] uppercase tracking-widest text-white">Strony</h2>
              <button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white transition-colors font-bold">✕</button>
            </div>
            <div className="flex-1 p-4 relative z-10 bg-transparent">
               <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center cursor-pointer hover:bg-white/10 transition-all shadow-sm">
                 <span className="text-xs font-bold text-white">/{pageSlug}</span>
               </div>
            </div>
          </div>
        )}
        
        {/* 🔥 TUTAJ RENDERUJEMY NASZ DOM NAVIGATOR 🔥 */}
        {leftTab === 'layers' && (
          <div className="w-64 bg-[rgba(8,8,12,0.6)] backdrop-blur-[24px] saturate-[150%] h-full flex flex-col animate-in slide-in-from-left-4 relative overflow-hidden border-r border-white/5 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: 'var(--theme-color)', boxShadow: '0 0 15px var(--theme-color)' }}></div>
            <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center relative z-10">
              <h2 className="font-bold text-[11px] uppercase tracking-widest text-neutral-300">DOM Navigator</h2>
              <button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white transition-colors font-bold">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto py-2 relative z-10 bg-transparent">
              <DOMNavigator 
                 blocks={blocks}
                 activeId={activeId}
                 setActiveId={setActiveId}
                 setIsEditing={setIsEditing}
                 hiddenBlocks={hiddenBlocks}
                 toggleBlockVisibility={toggleBlockVisibility}
                 moveBlockTree={moveBlockTree}
              />
            </div>
          </div>
        )}

        {addCategory && activeCategoryData && (
          <div className="w-[340px] bg-[rgba(8,8,12,0.6)] backdrop-blur-[24px] saturate-[150%] h-full flex flex-col animate-in slide-in-from-left-4 relative overflow-hidden border-r border-white/5 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-full h-[1px]" style={{ backgroundColor: 'var(--theme-color)', boxShadow: '0 0 10px var(--theme-color)' }}></div>
            <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ backgroundColor: 'var(--theme-color)', opacity: 0.5 }}></div>
            
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/5 relative z-10">
              <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] drop-shadow-sm">
                {activeCategoryData.label}
              </h3>
              <button onClick={() => setAddCategory(null)} className="text-neutral-500 hover:text-white transition-colors font-bold">✕</button>
            </div>
            
            {addCategory === 'szablony' && (
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-hide relative z-10 bg-transparent">
                <button onClick={() => handleInsertTemplate('hero')} className="bg-[#2a2a2a] text-white p-3 rounded-xl hover:bg-[#444] transition-colors text-left border border-white/10 flex flex-col gap-1 group shadow-md">
                  <div className="w-full h-24 bg-neutral-800 rounded-md mb-2 overflow-hidden border border-neutral-700 group-hover:border-[#ff4500] transition-colors relative">
                     <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                     <div className="relative w-full h-full flex items-center justify-center flex-col gap-1.5 z-10">
                        <div className="w-20 h-2 bg-white rounded-full"></div>
                        <div className="w-32 h-1.5 bg-white/60 rounded-full"></div>
                        <div className="w-10 h-3 bg-[#ff4500] rounded mt-1 shadow-lg"></div>
                     </div>
                  </div>
                  <span className="text-[12px] font-bold text-white uppercase tracking-wider mt-1">Hero Banner</span>
                  <span className="text-[10px] text-neutral-400">Efektowny nagłówek z przyciskiem akcji na tle</span>
                </button>
                <button onClick={() => handleInsertTemplate('features')} className="bg-[#2a2a2a] text-white p-3 rounded-xl hover:bg-[#444] transition-colors text-left border border-white/10 flex flex-col gap-1 group shadow-md">
                  <div className="w-full h-20 bg-neutral-800 rounded-md mb-2 overflow-hidden border border-neutral-700 flex gap-2 p-3 items-stretch group-hover:border-[#ff4500] transition-colors bg-[#f4f4f4]">
                     <div className="flex-1 h-full bg-white rounded shadow-sm flex flex-col gap-1.5 p-1.5 border border-black/5">
                        <div className="w-3/4 h-1.5 bg-black/80 rounded-full"></div><div className="w-full h-1 bg-black/30 rounded-full"></div><div className="w-5/6 h-1 bg-black/30 rounded-full"></div>
                     </div>
                     <div className="flex-1 h-full bg-white rounded shadow-sm flex flex-col gap-1.5 p-1.5 border border-black/5">
                        <div className="w-3/4 h-1.5 bg-black/80 rounded-full"></div><div className="w-full h-1 bg-black/30 rounded-full"></div><div className="w-5/6 h-1 bg-black/30 rounded-full"></div>
                     </div>
                     <div className="flex-1 h-full bg-white rounded shadow-sm flex flex-col gap-1.5 p-1.5 border border-black/5">
                        <div className="w-3/4 h-1.5 bg-black/80 rounded-full"></div><div className="w-full h-1 bg-black/30 rounded-full"></div><div className="w-5/6 h-1 bg-black/30 rounded-full"></div>
                     </div>
                  </div>
                  <span className="text-[12px] font-bold text-white uppercase tracking-wider mt-1">3 Karty Cech</span>
                  <span className="text-[10px] text-neutral-400">Trzy wyśrodkowane kolumny opisowe z cieniami</span>
                </button>
                <button onClick={() => handleInsertTemplate('footer')} className="bg-[#2a2a2a] text-white p-3 rounded-xl hover:bg-[#444] transition-colors text-left border border-white/10 flex flex-col gap-1 group shadow-md">
                  <div className="w-full h-12 bg-neutral-800 rounded-md mb-2 overflow-hidden border border-neutral-700 flex items-center justify-center group-hover:border-[#ff4500] transition-colors bg-[#111]">
                     <div className="w-24 h-1 bg-white/30 rounded-full"></div>
                  </div>
                  <span className="text-[12px] font-bold text-white uppercase tracking-wider mt-1">Stopka</span>
                  <span className="text-[10px] text-neutral-400">Ciemny pasek na dół strony z prawami autorskimi</span>
                </button>
              </div>
            )}
            
            {addCategory === 'storage' && (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 scrollbar-hide relative z-10 bg-transparent">
                <label className="bg-[#2a2a2a] text-white text-xs font-bold px-4 py-4 rounded-xl shadow-sm hover:bg-[#444] transition-colors cursor-pointer border border-white/10 flex flex-col items-center justify-center gap-3 group">
                  <div className="bg-[#ff4500]/20 text-[#ff4500] p-3 rounded-full group-hover:scale-110 transition-transform">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  </div>
                  Wgraj projekt (.json)
                  <input type="file" accept=".json" onChange={(e) => { handleImportJSON(e); setAddCategory(null); }} className="hidden" />
                </label>
                <button onClick={() => { handleExportJSON(); setAddCategory(null); }} className="bg-[#2a2a2a] text-white text-xs font-bold px-4 py-4 rounded-xl shadow-sm hover:bg-[#444] transition-colors border border-white/10 flex flex-col items-center justify-center gap-3 group text-center">
                  <div className="bg-blue-500/20 text-blue-400 p-3 rounded-full group-hover:scale-110 transition-transform">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </div>
                  Pobierz projekt (.json)
                </button>
              </div>
            )}

            {addCategory !== 'szablony' && addCategory !== 'storage' && (
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 scrollbar-hide relative z-10 bg-transparent">
                {addCategory === 'tekst' && typeof TextPanel !== 'undefined' && <TextPanel handleAddBlock={handleAddBlock} />}
                {addCategory === 'obraz' && typeof ImagePanel !== 'undefined' && <ImagePanel handleAddBlock={handleAddBlock} />}
                {addCategory === 'przycisk' && typeof ButtonPanel !== 'undefined' && <ButtonPanel handleAddBlock={handleAddBlock} />}
                {addCategory === 'grafika' && typeof GraphicsPanel !== 'undefined' && <GraphicsPanel handleAddBlock={handleAddBlock} />}
                {addCategory === 'pola' && typeof LayoutPanel !== 'undefined' && <LayoutPanel handleAddBlock={handleAddBlock} />}
                {addCategory === 'wideo' && typeof VideoPanel !== 'undefined' && <VideoPanel handleAddBlock={handleAddBlock} />}
                {addCategory === 'formularze' && typeof FormPanel !== 'undefined' && <FormPanel handleAddBlock={handleAddBlock} />}
                {addCategory === 'menu' && typeof MenuPanel !== 'undefined' && <MenuPanel handleAddBlock={handleAddBlock} />}
                {addCategory === 'wyskakujace' && typeof PopupPanel !== 'undefined' && <PopupPanel handleAddBlock={handleAddBlock} />}
                {addCategory === 'lista' && typeof ListPanel !== 'undefined' && <ListPanel handleAddBlock={handleAddBlock} />}
                {addCategory === 'social' && typeof SocialPanel !== 'undefined' && <SocialPanel handleAddBlock={handleAddBlock} />}
                {addCategory === 'osadzona' && typeof EmbedPanel !== 'undefined' && <EmbedPanel handleAddBlock={handleAddBlock} />}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}