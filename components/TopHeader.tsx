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
}

export default function TopHeader({ 
  canvasZoom, setCanvasZoom, showGrid, setShowGrid, pageSlug, setPageSlug, handlePublish, 
  activeBlock, updateActiveBlock, viewport, setViewport 
}: TopHeaderProps) {
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);
  const [showBgMenu, setShowBgMenu] = useState(false);

  const applyLayout = (type: 'flex-col' | 'grid-2' | 'grid-3' | 'grid-2-rows' | 'grid-left' | 'grid-right' | 'grid-2x2') => {
    if (!activeBlock) return;
    let updates = { display: 'grid', gap: '20px' };
    
    if (type === 'flex-col') updates = { display: 'flex', flexDirection: 'column', gap: '20px' } as any;
    if (type === 'grid-2') updates = { ...updates, gridTemplateColumns: 'repeat(2, 1fr)' } as any;
    if (type === 'grid-3') updates = { ...updates, gridTemplateColumns: 'repeat(3, 1fr)' } as any;
    if (type === 'grid-2-rows') updates = { display: 'grid', gap: '20px', gridTemplateRows: 'repeat(2, 1fr)', gridTemplateColumns: '1fr' } as any;
    if (type === 'grid-left') updates = { ...updates, gridTemplateColumns: '2fr 1fr' } as any;
    if (type === 'grid-right') updates = { ...updates, gridTemplateColumns: '1fr 2fr' } as any;
    if (type === 'grid-2x2') updates = { ...updates, gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' } as any;

    updateActiveBlock({ styles: updates });
    setShowLayoutMenu(false);
  };

  const isContainer = activeBlock && ['container', 'section', 'form', 'grid'].includes(activeBlock.type);

  return (
    <header className="h-14 bg-[#1A1A1A] border-b border-black flex items-center justify-between px-6 z-[300] shadow-md">
      
      {/* 1. KONTROLA WIDOKU (VIEWPORT) */}
      <div className="flex items-center bg-black p-1 rounded-lg border border-neutral-800">
        <button onClick={() => setViewport('desktop')} className={`px-3 py-1.5 rounded transition text-xs flex items-center gap-2 ${viewport === 'desktop' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-500 hover:text-neutral-300'}`}>💻 <span className="hidden xl:inline">Desktop</span></button>
        <button onClick={() => setViewport('tablet')} className={`px-3 py-1.5 rounded transition text-xs flex items-center gap-2 ${viewport === 'tablet' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-500 hover:text-neutral-300'}`}>📱 <span className="hidden xl:inline">Tablet</span></button>
        <button onClick={() => setViewport('mobile')} className={`px-3 py-1.5 rounded transition text-xs flex items-center gap-2 ${viewport === 'mobile' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-500 hover:text-neutral-300'}`}>📱 <span className="hidden xl:inline">Mobile</span></button>
      </div>

      {/* 2. AKCJE KONTEKSTOWE (WIDOCZNE TYLKO PO ZAZNACZENIU) */}
      <div className="flex items-center gap-2 flex-1 justify-center relative">
        {activeBlock ? (
          <>
            {/* PRZYCISK ZMIANY UKŁADU */}
            <div className="relative">
              <button 
                onClick={() => { setShowLayoutMenu(!showLayoutMenu); setShowBgMenu(false); }}
                disabled={!isContainer}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition border ${showLayoutMenu ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800'} ${!isContainer && 'opacity-50 cursor-not-allowed'}`}
              >
                ⊞ Zmień układ
              </button>

              {/* POPOVER UKŁADU */}
              {showLayoutMenu && isContainer && (
                <div className="absolute top-full mt-2 left-0 bg-white p-4 rounded-xl shadow-2xl border border-neutral-200 z-50 w-[240px]">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-3">Wybierz strukturę</span>
                  <div className="grid grid-cols-4 gap-2">
                    <button onClick={() => applyLayout('flex-col')} className="aspect-square rounded border-2 border-blue-100 hover:border-blue-500 bg-white flex items-center justify-center p-1"><div className="w-full h-full border border-blue-500 bg-blue-50 rounded-sm"></div></button>
                    <button onClick={() => applyLayout('grid-2')} className="aspect-square rounded border-2 border-blue-100 hover:border-blue-500 bg-white flex gap-0.5 p-1"><div className="w-1/2 h-full bg-blue-400 rounded-sm"></div><div className="w-1/2 h-full bg-blue-400 rounded-sm"></div></button>
                    <button onClick={() => applyLayout('grid-3')} className="aspect-square rounded border-2 border-blue-100 hover:border-blue-500 bg-white flex gap-[1px] p-1"><div className="w-1/3 h-full bg-blue-400 rounded-sm"></div><div className="w-1/3 h-full bg-blue-400 rounded-sm"></div><div className="w-1/3 h-full bg-blue-400 rounded-sm"></div></button>
                    <button onClick={() => applyLayout('grid-2-rows')} className="aspect-square rounded border-2 border-blue-100 hover:border-blue-500 bg-white flex flex-col gap-0.5 p-1"><div className="w-full h-1/2 bg-blue-400 rounded-sm"></div><div className="w-full h-1/2 bg-blue-400 rounded-sm"></div></button>
                    
                    <button onClick={() => applyLayout('grid-2x2')} className="aspect-square rounded border-2 border-blue-100 hover:border-blue-500 bg-white grid grid-cols-2 gap-0.5 p-1"><div className="bg-blue-400 rounded-sm"></div><div className="bg-blue-400 rounded-sm"></div><div className="bg-blue-400 rounded-sm"></div><div className="bg-blue-400 rounded-sm"></div></button>
                    <button onClick={() => applyLayout('grid-left')} className="aspect-square rounded border-2 border-blue-100 hover:border-blue-500 bg-white flex gap-0.5 p-1"><div className="w-2/3 h-full bg-blue-400 rounded-sm"></div><div className="w-1/3 h-full bg-blue-400 rounded-sm"></div></button>
                    <button onClick={() => applyLayout('grid-right')} className="aspect-square rounded border-2 border-blue-100 hover:border-blue-500 bg-white flex gap-0.5 p-1"><div className="w-1/3 h-full bg-blue-400 rounded-sm"></div><div className="w-2/3 h-full bg-blue-400 rounded-sm"></div></button>
                  </div>
                </div>
              )}
            </div>

            {/* PRZYCISK ZMIANY TŁA */}
            <div className="relative">
              <button 
                onClick={() => { setShowBgMenu(!showBgMenu); setShowLayoutMenu(false); }}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition border ${showBgMenu ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400' : 'bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800'}`}
              >
                <div className="w-3 h-3 rounded-full border border-white/50" style={{backgroundColor: activeBlock.styles.backgroundColor || '#000'}}></div> Zastąp tło
              </button>

              {/* POPOVER TŁA */}
              {showBgMenu && (
                <div className="absolute top-full mt-2 left-0 bg-[#222] p-4 rounded-xl shadow-2xl border border-neutral-700 z-50 w-[260px] text-white">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase block mb-3">Kolor jednolity</span>
                  <div className="flex items-center gap-3 bg-black p-2 rounded border border-neutral-700 mb-4">
                    <input type="color" value={activeBlock.styles.backgroundColor || '#000000'} onChange={e => updateActiveBlock({ styles: { backgroundColor: e.target.value, bgType: 'color' }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" />
                    <span className="text-xs font-mono">{activeBlock.styles.backgroundColor || 'Brak'}</span>
                  </div>
                  
                  <span className="text-[10px] font-bold text-neutral-400 uppercase block mb-2">Obraz z URL</span>
                  <input type="text" value={activeBlock.styles.bgImage || ''} onChange={e => updateActiveBlock({ styles: { bgImage: e.target.value, bgType: 'image' }})} placeholder="https://..." className="w-full bg-black border border-neutral-700 p-2 text-xs rounded mb-2" />
                </div>
              )}
            </div>
          </>
        ) : (
          <span className="text-xs text-neutral-600 font-bold bg-neutral-900 px-4 py-1.5 rounded-lg border border-neutral-800">Zaznacz warstwę, by edytować</span>
        )}
      </div>

      {/* 3. ZOOM I ZAPIS */}
      <div className="flex items-center gap-4">
         <div className="flex items-center bg-black rounded border border-neutral-800 text-xs">
           <button onClick={() => setCanvasZoom(Math.max(0.25, canvasZoom - 0.25))} className="px-3 py-1.5 hover:bg-neutral-800 text-neutral-400">−</button>
           <span className="px-2 font-mono w-12 text-center text-white">{Math.round(canvasZoom * 100)}%</span>
           <button onClick={() => setCanvasZoom(Math.min(2, canvasZoom + 0.25))} className="px-3 py-1.5 hover:bg-neutral-800 text-neutral-400">+</button>
         </div>
         <button onClick={() => setShowGrid(!showGrid)} className={`px-3 py-1.5 rounded border text-xs font-bold transition ${showGrid ? 'bg-blue-600 border-blue-500 text-white' : 'bg-black border-neutral-800 text-neutral-400 hover:bg-neutral-800'}`} title="Siatka Architektoniczna">⊞</button>
         <input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value.toLowerCase())} className="bg-black text-white border border-neutral-800 text-xs px-3 py-1.5 rounded outline-none focus:border-blue-500 w-32" placeholder="Adres..." />
         <button onClick={handlePublish} className="bg-blue-600 text-white hover:bg-blue-500 text-[11px] uppercase tracking-wider font-extrabold px-6 py-1.5 rounded transition shadow-lg">ZAPISZ</button>
      </div>
    </header>
  );
}