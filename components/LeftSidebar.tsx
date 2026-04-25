import React from 'react';

const categories = [
  { id: 'tekst', label: 'Tekst', icon: 'T' }, { id: 'obraz', label: 'Obraz', icon: '🖼️' }, { id: 'przycisk', label: 'Przycisk', icon: '👆' },
  { id: 'grafika', label: 'Grafika', icon: '⭐' }, { id: 'pola', label: 'Pola i Sekcje', icon: '📦' }, { id: 'wideo', label: 'Wideo', icon: '▶️' },
  { id: 'formularze', label: 'Formularze', icon: '📝' }, { id: 'menu', label: 'Menu', icon: '☰' }, { id: 'wyskakujace', label: 'Wyskakujące okna', icon: '🪟' },
  { id: 'lista', label: 'Lista', icon: '📋' }, { id: 'galeria', label: 'Galeria', icon: '🎠' }, { id: 'social', label: 'Social Media', icon: '❤️' },
  { id: 'osadzona', label: 'Osadzona treść', icon: '🔗' }
];

const menuOptions: Record<string, {label: string, type: string, variant: string}[]> = {
  tekst: [ { label: 'Tytuł (H1)', type: 'h1', variant: '' }, { label: 'Nagłówek (H2)', type: 'h2', variant: '' }, { label: 'Akapit (P)', type: 'p', variant: '' }, { label: '🌟 Wstęga (Animacja)', type: 'ribbon', variant: '' }, { label: 'Kombinacja Tekstu', type: 'container', variant: 'text-combo' }, { label: 'FAQ Zwijane', type: 'faq', variant: '' } ],
  obraz: [ { label: 'Zdjęcie', type: 'img', variant: 'photo' }, { label: 'Wycięte (PNG)', type: 'img', variant: 'transparent' } ],
  przycisk: [ { label: 'Pełny kolor', type: 'button', variant: '' }, { label: 'Tylko Obrys', type: 'button', variant: 'outline' }, { label: 'Gradient', type: 'button', variant: 'gradient' } ],
  grafika: [ { label: 'Kwadrat', type: 'shape', variant: 'box' }, { label: 'Linia', type: 'shape', variant: 'line' } ],
  pola: [ { label: 'Sekcja Klasyczna', type: 'section', variant: '' }, { label: '🎬 Wideo Hero', type: 'section', variant: 'video-hero' }, { label: 'Puste pole', type: 'container', variant: 'empty' }, { label: 'Zaprojektowane', type: 'container', variant: 'designed' } ],
  wideo: [ { label: 'YouTube Wideo', type: 'video', variant: '' } ],
  formularze: [ { label: 'Formularz Kontaktowy', type: 'form', variant: '' }, { label: 'Pole Tekstowe', type: 'input', variant: '' }, { label: 'Wiadomość', type: 'textarea', variant: '' }, { label: 'Mapa Google', type: 'map', variant: '' } ],
  menu: [ { label: 'Menu Poziome', type: 'menu', variant: 'horizontal' }, { label: 'Menu Pionowe', type: 'menu', variant: 'vertical' }, { label: 'Menu Hamburger', type: 'menu', variant: 'hamburger'} ],
  wyskakujace: [ { label: 'Popup', type: 'popup', variant: '' } ],
  lista: [ { label: 'Zwykła Lista', type: 'list', variant: '' } ],
  galeria: [ { label: '✨ Siatka z Zoomem', type: 'grid', variant: 'gallery-grid' }, { label: 'Karuzela (Slider)', type: 'carousel', variant: '' } ],
  social: [ { label: 'Ikonki Social', type: 'social', variant: '' }, { label: 'Pasek Udostępniania', type: 'button', variant: 'share' }, { label: 'Kanał Insta', type: 'grid', variant: 'insta'} ],
  osadzona: [ { label: 'iFrame Strony', type: 'embed', variant: 'site' }, { label: 'Własny kod HTML', type: 'embed', variant: 'html' } ]
};

interface Props {
  leftTab: 'add' | 'layers' | null; setLeftTab: (t: any) => void;
  addCategory: string | null; setAddCategory: (c: any) => void;
  handleAddBlock: (t: string, v: string, l: string) => void;
  blocks: any[]; activeId: number | null; setActiveId: (id: any) => void; setIsEditing: (b: boolean) => void;
}

export default function LeftSidebar({ leftTab, setLeftTab, addCategory, setAddCategory, handleAddBlock, blocks, activeId, setActiveId, setIsEditing }: Props) {
  const renderLayerTree = (arr: any[], depth = 0) => {
    return arr.map(b => (
      <div key={`tree-${b.id}`} className="flex flex-col w-full">
        <button onClick={(e) => { e.stopPropagation(); setActiveId(b.id); setIsEditing(false); }} className={`text-left text-[11px] py-1.5 px-2 truncate transition flex items-center gap-2 ${activeId === b.id ? 'bg-blue-600 text-white font-bold' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`} style={{ paddingLeft: `${(depth * 12) + 8}px` }}>
          {b.children ? '📂' : '📄'} {b.name}
        </button>
        {b.children && renderLayerTree(b.children, depth + 1)}
      </div>
    ));
  };

  return (
    <>
      <aside className="w-16 bg-[#111] border-r border-neutral-800 flex flex-col items-center py-6 gap-4 z-50 shrink-0">
        <button onClick={() => { setLeftTab(leftTab==='add'?null:'add'); if(leftTab!=='add') setAddCategory('tekst'); }} className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition ${leftTab==='add'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>+</button>
        <button onClick={() => setLeftTab(leftTab==='layers'?null:'layers')} className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition ${leftTab==='layers'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>☰</button>
      </aside>

      <div className="relative z-40 h-full flex">
        {leftTab === 'add' && (
          <div className="w-56 bg-[#111] border-r border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-left-4">
            <div className="px-5 py-4 border-b border-neutral-800"><span className="font-bold text-[11px] uppercase tracking-widest text-neutral-400">DODAJ ELEMENT</span></div>
            <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
              {categories.map(cat => (
                <button key={cat.id} onMouseEnter={() => setAddCategory(cat.id)} onClick={() => setAddCategory(cat.id)} className={`w-full text-left px-5 py-3 text-xs font-semibold transition flex items-center gap-3 border-l-2 ${addCategory === cat.id ? 'bg-neutral-800 text-white border-blue-500' : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 border-transparent'}`}><span className="w-4 text-center">{cat.icon}</span> {cat.label}</button>
              ))}
            </div>
          </div>
        )}
        {leftTab === 'layers' && (
          <div className="w-64 bg-[#111] border-r border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-left-4">
            <div className="px-5 py-4 border-b border-neutral-800 flex justify-between items-center"><h2 className="font-bold text-[11px] uppercase tracking-widest text-neutral-400">Nawigator DOM</h2><button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white">✕</button></div>
            <div className="flex-1 overflow-y-auto py-2">{blocks.length === 0 ? <div className="p-4 text-xs text-neutral-600 text-center">Płótno jest puste.</div> : renderLayerTree(blocks)}</div>
          </div>
        )}
        {leftTab === 'add' && addCategory && (
          <div className="absolute left-[100%] top-0 w-80 bg-[#161616] border-r border-neutral-800 h-full shadow-[20px_0_30px_rgba(0,0,0,0.6)] z-30 flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800 bg-[#161616]"><h3 className="text-[11px] font-bold text-white uppercase tracking-widest">{categories.find(c => c.id === addCategory)?.label}</h3><button onClick={() => {setLeftTab(null); setAddCategory(null);}} className="text-neutral-500 hover:text-white text-lg leading-none">✕</button></div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              {menuOptions[addCategory]?.map((opt, i) => (<button key={i} onClick={() => handleAddBlock(opt.type, opt.variant, opt.label)} className="p-4 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition border-l-4 hover:border-l-blue-500"><span className="text-sm font-bold text-white block">{opt.label}</span></button>))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}