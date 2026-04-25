import React, { useState } from 'react';

interface TopHeaderProps {
  canvasZoom: number; setCanvasZoom: (z: number) => void;
  showGrid: boolean; setShowGrid: (s: boolean) => void;
  pageSlug: string; setPageSlug: (s: string) => void;
  handlePublish: () => void;
  activeBlock: any;
  updateActiveBlock: (updates: any) => void;
  viewport: 'desktop' | 'tablet' | 'mobile';
  setViewport: (v: 'desktop' | 'tablet' | 'mobile') => void;
  handleAddSection: (layout: string) => void;
}

export default function TopHeader({ 
  canvasZoom, setCanvasZoom, showGrid, setShowGrid, pageSlug, setPageSlug, handlePublish, 
  activeBlock, updateActiveBlock, viewport, setViewport, handleAddSection 
}: TopHeaderProps) {
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);
  const [showBgMenu, setShowBgMenu] = useState(false);
  const [showAddSectionMenu, setShowAddSectionMenu] = useState(false);

  const applyLayout = (type: string) => {
    if (!activeBlock) return;
    let updates: any = { display: 'grid', gap: '20px', flexDirection: 'unset', gridTemplateColumns: 'unset', gridTemplateRows: 'unset' };
    
    if (type === 'flex-col') updates = { display: 'flex', flexDirection: 'column', gap: '20px', gridTemplateColumns: 'unset', gridTemplateRows: 'unset' };
    else if (type === 'grid-2') updates.gridTemplateColumns = 'repeat(2, 1fr)';
    else if (type === 'grid-3') updates.gridTemplateColumns = 'repeat(3, 1fr)';
    else if (type === 'grid-2-rows') { updates.gridTemplateRows = 'repeat(2, 1fr)'; updates.gridTemplateColumns = '1fr'; }
    else if (type === 'grid-left') updates.gridTemplateColumns = '2fr 1fr';
    else if (type === 'grid-right') updates.gridTemplateColumns = '1fr 2fr';
    else if (type === 'grid-2x2') { updates.gridTemplateColumns = 'repeat(2, 1fr)'; updates.gridTemplateRows = 'repeat(2, 1fr)'; }

    updateActiveBlock({ styles: updates });
    setShowLayoutMenu(false);
  };

  const onAddSection = (type: string) => {
    handleAddSection(type);
    setShowAddSectionMenu(false);
  };

  const isContainer = activeBlock && ['container', 'section', 'form', 'grid'].includes(activeBlock.type);

  return (
    <header className="h-16 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 z-[300]">
      
      {/* WIDOKI (Modern Pill Shape) */}
      <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/5 shadow-inner">
        <button onClick={() => setViewport('desktop')} className={`px-4 py-1.5 rounded-full transition-all text-xs font-semibold flex items-center gap-2 ${viewport === 'desktop' ? 'bg-white/10 text-white shadow-md' : 'text-neutral-500 hover:text-neutral-300'}`}>💻 <span className="hidden xl:inline">Desktop</span></button>
        <button onClick={() => setViewport('tablet')} className={`px-4 py-1.5 rounded-full transition-all text-xs font-semibold flex items-center gap-2 ${viewport === 'tablet' ? 'bg-white/10 text-white shadow-md' : 'text-neutral-500 hover:text-neutral-300'}`}>📱 <span className="hidden xl:inline">Tablet</span></button>
        <button onClick={() => setViewport('mobile')} className={`px-4 py-1.5 rounded-full transition-all text-xs font-semibold flex items-center gap-2 ${viewport === 'mobile' ? 'bg-white/10 text-white shadow-md' : 'text-neutral-500 hover:text-neutral-300'}`}>📱 <span className="hidden xl:inline">Mobile</span></button>
      </div>

      <div className="flex items-center gap-3 flex-1 justify-center relative">
        
        {/* ADD SECTION (Gradient Button) */}
        <div className="relative mr-4 border-r border-white/10 pr-4">
          <button 
            onClick={() => { setShowAddSectionMenu(!showAddSectionMenu); setShowLayoutMenu(false); setShowBgMenu(false); }}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transform hover:-translate-y-0.5"
          >
            <span className="text-lg leading-none">+</span> Dodaj Sekcję
          </button>

          {showAddSectionMenu && (
            <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-[#18181b]/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/10 z-50 w-[260px] animate-in fade-in slide-in-from-top-4">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-4 text-center">Wybierz układ</span>
              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => onAddSection('flex-col')} className="aspect-square rounded-xl border border-white/10 hover:border-blue-500 bg-white/5 flex items-center justify-center p-1.5 transition-colors"><div className="w-full h-full bg-neutral-400 rounded"></div></button>
                <button onClick={() => onAddSection('grid-2')} className="aspect-square rounded-xl border border-white/10 hover:border-blue-500 bg-white/5 flex gap-1 p-1.5 transition-colors"><div className="w-1/2 h-full bg-neutral-400 rounded"></div><div className="w-1/2 h-full bg-neutral-400 rounded"></div></button>
                <button onClick={() => onAddSection('grid-3')} className="aspect-square rounded-xl border border-white/10 hover:border-blue-500 bg-white/5 flex gap-1 p-1.5 transition-colors"><div className="w-1/3 h-full bg-neutral-400 rounded"></div><div className="w-1/3 h-full bg-neutral-400 rounded"></div><div className="w-1/3 h-full bg-neutral-400 rounded"></div></button>
                <button onClick={() => onAddSection('grid-2-rows')} className="aspect-square rounded-xl border border-white/10 hover:border-blue-500 bg-white/5 flex flex-col gap-1 p-1.5 transition-colors"><div className="w-full h-1/2 bg-neutral-400 rounded"></div><div className="w-full h-1/2 bg-neutral-400 rounded"></div></button>
                <button onClick={() => onAddSection('grid-2x2')} className="aspect-square rounded-xl border border-white/10 hover:border-blue-500 bg-white/5 grid grid-cols-2 gap-1 p-1.5 transition-colors"><div className="bg-neutral-400 rounded"></div><div className="bg-neutral-400 rounded"></div><div className="bg-neutral-400 rounded"></div><div className="bg-neutral-400 rounded"></div></button>
                <button onClick={() => onAddSection('grid-left')} className="aspect-square rounded-xl border border-white/10 hover:border-blue-500 bg-white/5 flex gap-1 p-1.5 transition-colors"><div className="w-2/3 h-full bg-neutral-400 rounded"></div><div className="w-1/3 h-full bg-neutral-400 rounded"></div></button>
                <button onClick={() => onAddSection('grid-right')} className="aspect-square rounded-xl border border-white/10 hover:border-blue-500 bg-white/5 flex gap-1 p-1.5 transition-colors"><div className="w-1/3 h-full bg-neutral-400 rounded"></div><div className="w-2/3 h-full bg-neutral-400 rounded"></div></button>
              </div>
            </div>
          )}
        </div>

        {/* CONTEXT ACTIONS */}
        {activeBlock ? (
          <>
            <div className="relative">
              <button 
                onClick={() => { setShowLayoutMenu(!showLayoutMenu); setShowBgMenu(false); setShowAddSectionMenu(false); }}
                disabled={!isContainer}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all border ${showLayoutMenu ? 'bg-white/10 border-white/20 text-white shadow-inner' : 'bg-transparent border-white/10 text-neutral-400 hover:bg-white/5 hover:text-white'} ${!isContainer && 'opacity-50 cursor-not-allowed'}`}
              >
                ⊞ Zmień układ wewnątrz
              </button>

              {showLayoutMenu && isContainer && (
                <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-[#18181b]/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/10 z-50 w-[260px] animate-in fade-in slide-in-from-top-4">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-4 text-center">Wybierz strukturę</span>
                  <div className="grid grid-cols-4 gap-2">
                    <button onClick={() => applyLayout('flex-col')} className="aspect-square rounded-xl border border-white/10 hover:border-white bg-white/5 flex items-center justify-center p-1.5 transition-colors"><div className="w-full h-full bg-neutral-400 rounded"></div></button>
                    <button onClick={() => applyLayout('grid-2')} className="aspect-square rounded-xl border border-white/10 hover:border-white bg-white/5 flex gap-1 p-1.5 transition-colors"><div className="w-1/2 h-full bg-neutral-400 rounded"></div><div className="w-1/2 h-full bg-neutral-400 rounded"></div></button>
                    <button onClick={() => applyLayout('grid-3')} className="aspect-square rounded-xl border border-white/10 hover:border-white bg-white/5 flex gap-1 p-1.5 transition-colors"><div className="w-1/3 h-full bg-neutral-400 rounded"></div><div className="w-1/3 h-full bg-neutral-400 rounded"></div><div className="w-1/3 h-full bg-neutral-400 rounded"></div></button>
                    <button onClick={() => applyLayout('grid-2-rows')} className="aspect-square rounded-xl border border-white/10 hover:border-white bg-white/5 flex flex-col gap-1 p-1.5 transition-colors"><div className="w-full h-1/2 bg-neutral-400 rounded"></div><div className="w-full h-1/2 bg-neutral-400 rounded"></div></button>
                    <button onClick={() => applyLayout('grid-2x2')} className="aspect-square rounded-xl border border-white/10 hover:border-white bg-white/5 grid grid-cols-2 gap-1 p-1.5 transition-colors"><div className="bg-neutral-400 rounded"></div><div className="bg-neutral-400 rounded"></div><div className="bg-neutral-400 rounded"></div><div className="bg-neutral-400 rounded"></div></button>
                    <button onClick={() => applyLayout('grid-left')} className="aspect-square rounded-xl border border-white/10 hover:border-white bg-white/5 flex gap-1 p-1.5 transition-colors"><div className="w-2/3 h-full bg-neutral-400 rounded"></div><div className="w-1/3 h-full bg-neutral-400 rounded"></div></button>
                    <button onClick={() => applyLayout('grid-right')} className="aspect-square rounded-xl border border-white/10 hover:border-white bg-white/5 flex gap-1 p-1.5 transition-colors"><div className="w-1/3 h-full bg-neutral-400 rounded"></div><div className="w-2/3 h-full bg-neutral-400 rounded"></div></button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => { setShowBgMenu(!showBgMenu); setShowLayoutMenu(false); setShowAddSectionMenu(false); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all border ${showBgMenu ? 'bg-white/10 border-white/20 text-white shadow-inner' : 'bg-transparent border-white/10 text-neutral-400 hover:bg-white/5 hover:text-white'}`}
              >
                <div className="w-3 h-3 rounded-full border border-white/20 shadow-sm" style={{backgroundColor: activeBlock.styles.backgroundColor || '#000'}}></div> Zastąp tło
              </button>

              {showBgMenu && (
                <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-[#18181b]/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/10 z-50 w-[260px] animate-in fade-in slide-in-from-top-4">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-4 text-center">Kolor jednolity</span>
                  <div className="flex items-center gap-3 bg-black/50 p-2 rounded-xl border border-white/5 mb-5 shadow-inner">
                    <input type="color" value={activeBlock.styles.backgroundColor?.includes('#') ? activeBlock.styles.backgroundColor : '#000000'} onChange={e => updateActiveBlock({ styles: { backgroundColor: e.target.value, bgType: 'color' }})} className="w-8 h-8 rounded-lg border-0 p-0 bg-transparent cursor-pointer" />
                    <span className="text-xs font-mono text-white">{activeBlock.styles.backgroundColor || 'Brak'}</span>
                  </div>
                  
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2 text-center">Obraz z URL</span>
                  <input type="text" value={activeBlock.styles.bgImage || ''} onChange={e => updateActiveBlock({ styles: { bgImage: e.target.value, bgType: 'image' }})} placeholder="Wklej link..." className="w-full bg-black/50 border border-white/5 p-3 text-xs rounded-xl text-white outline-none focus:border-blue-500 transition-colors shadow-inner" />
                </div>
              )}
            </div>
          </>
        ) : (
          <span className="text-xs text-neutral-500 font-medium px-4 py-2 rounded-full border border-dashed border-white/10 bg-white/[0.02]">Zaznacz warstwę, by edytować</span>
        )}
      </div>

      <div className="flex items-center gap-3">
         <div className="flex items-center bg-white/5 rounded-full border border-white/5 text-xs shadow-inner">
           <button onClick={() => setCanvasZoom(Math.max(0.25, canvasZoom - 0.25))} className="px-4 py-2 hover:bg-white/5 text-neutral-400 rounded-l-full transition-colors">−</button>
           <span className="px-2 font-mono w-12 text-center text-white">{Math.round(canvasZoom * 100)}%</span>
           <button onClick={() => setCanvasZoom(Math.min(2, canvasZoom + 0.25))} className="px-4 py-2 hover:bg-white/5 text-neutral-400 rounded-r-full transition-colors">+</button>
         </div>
         <button onClick={() => setShowGrid(!showGrid)} className={`w-9 h-9 rounded-full border text-sm font-bold transition-all flex items-center justify-center ${showGrid ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_10px_rgba(79,70,229,0.4)]' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'}`} title="Siatka Architektoniczna">⊞</button>
         <input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value.toLowerCase())} className="bg-white/5 text-white border border-white/10 text-xs px-4 py-2 rounded-full outline-none focus:border-blue-500 w-32 shadow-inner transition-colors" placeholder="Adres URL..." />
         <button onClick={handlePublish} className="bg-white text-black hover:bg-neutral-200 text-xs font-bold px-6 py-2 rounded-full transition shadow-lg transform hover:-translate-y-0.5">ZAPISZ</button>
      </div>
    </header>
  );
}