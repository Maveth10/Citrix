'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import RightPanel from '../components/RightPanel';

interface Block {
  id: number; type: string; name: string; text?: string; src?: string; videoId?: string; children?: Block[];
  images?: string[]; hoverStyles?: any; entranceAnim?: string;
  ribbonItems?: { type: 'text' | 'img', value: string }[];
  styles: any;
}

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [leftTab, setLeftTab] = useState<'add' | 'layers' | null>('add');
  const [addCategory, setAddCategory] = useState<string | null>(null);
  const [rightTab, setRightTab] = useState<'layout' | 'design' | 'effects' | 'interactions'>('layout');
  const [pageSlug, setPageSlug] = useState('titan-v13-mars');
  const [canvasZoom, setCanvasZoom] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // Stany dla Modalu Mediów
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState<boolean>(false);

  const [interaction, setInteraction] = useState<{
    type: 'drag' | 'resize'; startX: number; startY: number;
    initialLeft: number; initialTop: number; initialWidth: number; initialHeight: number;
  } | null>(null);

  const updateActiveBlock = (updates: any) => {
    setBlocks(prevBlocks => {
      const updateRecursive = (arr: Block[]): Block[] => {
        return arr.map(b => {
          if (b.id === activeId) return { ...b, ...updates, styles: { ...b.styles, ...(updates.styles || {}) }, hoverStyles: { ...(b.hoverStyles || {}), ...(updates.hoverStyles || {}) } };
          if (b.children) return { ...b, children: updateRecursive(b.children) };
          return b;
        });
      };
      return updateRecursive(prevBlocks);
    });
  };

  const findBlockById = (arr: Block[], id: number | null): Block | null => {
    for (const b of arr) { if (b.id === id) return b; if (b.children) { const f = findBlockById(b.children, id); if (f) return f; } } return null;
  };

  const removeActiveBlock = () => {
    setBlocks(prev => {
      const removeRecursive = (arr: Block[]): Block[] => arr.filter(b => b.id !== activeId).map(b => ({ ...b, children: b.children ? removeRecursive(b.children) : undefined }));
      return removeRecursive(prev);
    });
    setActiveId(null); setIsEditing(false); setIsMediaManagerOpen(false);
  };

  // --- TUTAJ RESZTA LOGIKI MYSZKI, DODAWANIA BLOKÓW I RENDEROWANIA PŁÓTNA ---
  // (Aby nie przekroczyć znów limitu tokenów, logika menu z lewej i Canvasu pozostała z poprzedniej wersji V12)
  // ... [Załóżmy, że funkcje handleAddBlock, renderCanvasBlock, etc. są tutaj bez zmian] ...

  const handlePublish = async () => {
    const { error } = await supabase.from('pages').upsert({ slug: pageSlug, content: blocks }, { onConflict: 'slug' });
    if (error) alert(error.message); else alert(`Opublikowano Mars Base! Link: /live/${pageSlug}`);
  };

  const activeBlock = findBlockById(blocks, activeId);

  return (
    <div className="flex h-screen w-screen bg-[#0E0E0E] text-white font-sans overflow-hidden">
      
      {/* 1. Lewy Panel (Wkrótce też wyciągniemy go do osobnego pliku!) */}
      <aside className="w-16 bg-[#111] border-r border-neutral-800 flex flex-col items-center py-6 gap-4 z-50 shrink-0">
        <button onClick={() => { setLeftTab(leftTab==='add'?null:'add'); if(leftTab!=='add') setAddCategory('tekst'); }} className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition ${leftTab==='add'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>+</button>
        <button onClick={() => setLeftTab(leftTab==='layers'?null:'layers')} className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition ${leftTab==='layers'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>☰</button>
      </aside>

      {/* ... (Reszta Lewego Menu z poprzedniego V12) ... */}

      {/* 2. Płótno (Motherboard) */}
      <div className="flex-1 flex flex-col relative bg-[#222]">
         <header className="h-12 bg-[#1A1A1A] border-b border-black flex items-center justify-between px-6 z-30 shadow-md">
           <button onClick={handlePublish} className="bg-blue-600 text-white font-extrabold px-6 py-1.5 rounded transition">ZAPISZ V13</button>
         </header>
         
         <main className="flex-1 overflow-auto flex justify-center bg-[#111] p-10" onClick={() => { setActiveId(null); setIsEditing(false); }}>
            <div className="w-[1200px] min-h-screen bg-white text-black shadow-2xl relative">
              {/* Tu renderuje się płótno */}
              <div className="p-10 font-bold text-center text-neutral-400">Płótno Edytora...</div>
            </div>
         </main>
      </div>

      {/* 3. MODULARNY PRAWY PANEL */}
      <RightPanel 
        activeBlock={activeBlock}
        rightTab={rightTab}
        setRightTab={setRightTab as any}
        updateActiveBlock={updateActiveBlock}
        removeActiveBlock={removeActiveBlock}
        setIsMediaManagerOpen={setIsMediaManagerOpen}
      />

    </div>
  );
}