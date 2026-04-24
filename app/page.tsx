'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabase';

// NOWY INTERFEJS: Każdy blok może mieć dzieci!
interface Block {
  id: number;
  type: string;
  text?: string;
  title?: string;
  src?: string;
  videoId?: string;
  children?: Block[]; // TO JEST KLUCZ DO POTĘGI
  layering: { position: 'relative' | 'absolute'; top: number; left: number; zIndex: number; };
  styles: any;
}

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [leftTab, setLeftTab] = useState<string | null>(null);
  const [pageSlug, setPageSlug] = useState('v2-start');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const [interaction, setInteraction] = useState<{ type: 'drag' | 'resize' | null; startX: number; startY: number; initialLeft: number; initialTop: number; initialWidth: number; initialHeight: number; } | null>(null);

  // FUNKCJA DODAWANIA: Jeśli mamy aktywny kontener, dodaj do niego. Jeśli nie - na płótno.
  const handleAddBlock = (type: string) => {
    const newBlock: Block = {
      id: Date.now(),
      type,
      children: type === 'section' || type === 'container' ? [] : undefined,
      layering: { position: type === 'section' ? 'relative' : 'absolute', top: 50, left: 50, zIndex: 10 },
      styles: { width: type === 'section' ? '100%' : '200px', height: type === 'section' ? '400px' : '100px', backgroundColor: type === 'section' ? '#ffffff' : type === 'container' ? '#f3f4f6' : 'transparent', padding: '20px' },
    };

    if (type === 'h1') { newBlock.text = 'Nagłówek'; newBlock.styles.fontSize = '32px'; newBlock.styles.fontWeight = '900'; }
    if (type === 'p') { newBlock.text = 'Treść akapitu...'; }

    // Logika zagnieżdżania: Jeśli zaznaczony jest kontener, wrzuć do niego
    const activeBlock = findBlockById(blocks, activeId);
    if (activeBlock && activeBlock.children) {
      activeBlock.children.push(newBlock);
      setBlocks([...blocks]);
    } else {
      setBlocks([...blocks, newBlock]);
    }
    setActiveId(newBlock.id);
  };

  // Pomocnicza funkcja do szukania klocka w drzewie
  const findBlockById = (arr: Block[], id: number | null): Block | null => {
    for (const b of arr) {
      if (b.id === id) return b;
      if (b.children) {
        const found = findBlockById(b.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const updateActiveBlock = (updates: any) => {
    const updateRecursive = (arr: Block[]) => {
      return arr.map(b => {
        if (b.id === activeId) return { ...b, ...updates };
        if (b.children) return { ...b, children: updateRecursive(b.children) };
        return b;
      });
    };
    setBlocks(updateRecursive(blocks));
  };

  const handlePublish = async () => {
    const { error } = await supabase.from('pages').upsert({ slug: pageSlug, content: blocks }, { onConflict: 'slug' });
    if (error) alert(error.message); else alert("Opublikowano silnik V2!");
  };

  // --- RENDERER REKURENCYJNY (Serce Ścieżki A) ---
  const renderBlock = (b: Block) => {
    const isActive = activeId === b.id;
    const isAbs = b.layering.position === 'absolute';
    const style = { ...b.styles, position: b.layering.position, top: isAbs ? b.layering.top : undefined, left: isAbs ? b.layering.left : undefined, zIndex: b.layering.zIndex };

    return (
      <div 
        key={b.id}
        style={style}
        onClick={(e) => { e.stopPropagation(); setActiveId(b.id); }}
        className={`group transition-all ${isActive ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-blue-300'}`}
      >
        {/* Etykieta typu dla ułatwienia pracy */}
        {isActive && <div className="absolute -top-6 left-0 bg-blue-500 text-white text-[9px] px-2 py-0.5 rounded-t uppercase font-bold">{b.type}</div>}
        
        {b.type === 'h1' && <h1 style={{fontSize: b.styles.fontSize, fontWeight: b.styles.fontWeight}}>{b.text}</h1>}
        {b.type === 'p' && <p>{b.text}</p>}
        {b.type === 'section' && (
          <div className="w-full h-full border-b border-dashed border-neutral-200 relative">
             {b.children?.map(child => renderBlock(child))}
             <div className="absolute bottom-2 right-2 text-[10px] text-neutral-300 font-mono italic">Sekcja</div>
          </div>
        )}
        {b.type === 'container' && (
          <div className="w-full h-full border border-neutral-200 rounded shadow-inner relative">
             {b.children?.map(child => renderBlock(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen w-screen bg-[#111] text-white font-sans overflow-hidden">
      {/* LEWY PANEL (WIX STYLE) */}
      <aside className="w-16 bg-black border-r border-neutral-800 flex flex-col items-center py-6 gap-8">
        <button onClick={() => setLeftTab(leftTab === 'add' ? null : 'add')} className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center">+</button>
        <div className="text-[10px] font-bold text-neutral-600 rotate-90 mt-10 tracking-widest">EDITOR V2</div>
      </aside>

      {leftTab === 'add' && (
        <div className="w-64 bg-[#1a1a1a] border-r border-neutral-800 p-4 animate-in slide-in-from-left-4">
          <h2 className="text-xs font-bold text-neutral-500 mb-4 uppercase tracking-widest">Struktura (Containers)</h2>
          <div className="flex flex-col gap-2 mb-8">
            <button onClick={() => handleAddBlock('section')} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded text-xs text-left">📂 Nowa Sekcja</button>
            <button onClick={() => handleAddBlock('container')} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded text-xs text-left">📦 Kontener (Box)</button>
          </div>
          <h2 className="text-xs font-bold text-neutral-500 mb-4 uppercase tracking-widest">Elementy</h2>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleAddBlock('h1')} className="p-2 bg-neutral-800 rounded text-[10px]">TYTUŁ</button>
            <button onClick={() => handleAddBlock('p')} className="p-2 bg-neutral-800 rounded text-[10px]">TEKST</button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden bg-[#222]">
        <header className="h-12 bg-black border-b border-neutral-800 flex items-center justify-between px-6">
          <input value={pageSlug} onChange={e => setPageSlug(e.target.value)} className="bg-transparent text-xs font-mono border-b border-neutral-700 outline-none focus:border-blue-500" />
          <button onClick={handlePublish} className="bg-blue-600 px-6 py-1.5 rounded-full text-xs font-bold">PUBLISH V2</button>
        </header>

        <main className="flex-1 overflow-auto p-10 flex justify-center scrollbar-hide" onClick={() => setActiveId(null)}>
          <div className="w-[1200px] bg-white text-black min-h-screen relative shadow-2xl">
            {blocks.map(b => renderBlock(b))}
          </div>
        </main>
      </div>

      {/* PRAWY PANEL (WIX STYLE) */}
      <aside className="w-72 bg-black border-l border-neutral-800 p-4 overflow-y-auto">
        {activeId ? (
          <div className="flex flex-col gap-6">
            <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Edycja Elementu</div>
            <div>
              <label className="text-[9px] text-neutral-500 block mb-1">Pozycja</label>
              <select 
                value={findBlockById(blocks, activeId)?.layering.position} 
                onChange={e => updateActiveBlock({ layering: { ...findBlockById(blocks, activeId)?.layering, position: e.target.value } })}
                className="w-full bg-neutral-900 border border-neutral-700 p-2 text-xs rounded"
              >
                <option value="relative">Naturalna (Flow)</option>
                <option value="absolute">Swobodna (Drag)</option>
              </select>
            </div>
          </div>
        ) : <div className="text-neutral-600 text-xs text-center mt-20 italic">Wybierz element, by zarządzać hierarchią.</div>}
      </aside>
    </div>
  );
}