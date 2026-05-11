import React, { useState } from 'react';

interface ImagePanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function ImagePanel({ handleAddBlock }: ImagePanelProps) {
  // Dodane dwie nowe zakładki: mockups i masks
  const [activeTab, setActiveTab] = useState<'single' | 'galleries' | 'mockups' | 'masks'>('single');

  // Funkcja pomocnicza do rysowania pięknych, mrocznych kart z ikoną
  const UICard = ({ title, desc, icon, onClick }: { title: string, desc: string, icon: string, onClick: () => void }) => (
    <button 
      onClick={onClick} 
      className="p-3 bg-[#1c1c21] hover:bg-[#25252b] border border-white/5 hover:border-emerald-500/40 rounded-xl text-left transition-all w-full flex items-center gap-4 group shadow-sm"
    >
      <div className="w-10 h-10 rounded-lg bg-[#25252b] group-hover:bg-emerald-500/20 group-hover:scale-105 flex items-center justify-center text-xl shrink-0 transition-all border border-white/5">
        {icon}
      </div>
      <div className="flex-1">
        <span className="text-xs font-bold text-neutral-200 block mb-0.5">{title}</span>
        <span className="text-[9px] text-neutral-500 block leading-tight">{desc}</span>
      </div>
    </button>
  );

  const getTabStyle = (tabName: string) => {
    return `flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === tabName ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`;
  };

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: POJEDYNCZE MEDIA */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => setActiveTab(activeTab === 'single' ? '' as any : 'single')} className={getTabStyle('single')}>
          <span>Pojedyncze Media</span><span className="text-lg leading-none">{activeTab === 'single' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'single' && (
          <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-white/5 animate-in slide-in-from-top-2 duration-300">
             <UICard icon="🖼️" title="Uniwersalny Obraz" desc="Pełna obsługa JPG, PNG, WebP oraz animowanych GIF." onClick={() => handleAddBlock('img', 'classic', 'Obraz')} />
             <UICard icon="✨" title="Zdjęcie Soft (Premium)" desc="Eleganckie zaokrąglenia (24px) i nowoczesny, miękki cień." onClick={() => handleAddBlock('img', 'rounded', 'Obraz Soft')} />
             <UICard icon="👤" title="Avatar (Okrągły)" desc="Proporcja 1:1. Idealny do profili, opinii i cytatów." onClick={() => handleAddBlock('img', 'avatar', 'Avatar')} />
             <UICard icon="📸" title="Retro Polaroid" desc="Stylizowana, biała ramka przypominająca odbitkę." onClick={() => handleAddBlock('img', 'polaroid', 'Polaroid')} />
          </div>
        )}
      </div>

      {/* KATEGORIA 2: KOLEKCJE I GALERIE */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => setActiveTab(activeTab === 'galleries' ? '' as any : 'galleries')} className={getTabStyle('galleries')}>
          <span>Kolekcje i Galerie</span><span className="text-lg leading-none">{activeTab === 'galleries' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'galleries' && (
          <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-white/5 animate-in slide-in-from-top-2 duration-300">
             <UICard icon="🔲" title="Klasyczna Siatka (3 kol)" desc="Równy, 3-kolumnowy układ idealny na zdjęcia produktów." onClick={() => handleAddBlock('grid', 'gallery-grid', 'Siatka')} />
             <UICard icon="🍱" title="Bento Grid (Asymetria)" desc="Nowoczesny układ z jednym dużym zdjęciem i mniejszymi obok." onClick={() => handleAddBlock('container', 'gallery-bento', 'Bento Grid')} />
             <UICard icon="🎠" title="Przewijana Karuzela" desc="Poziomy slider obrazów na natywnym przewijaniu (Scroll)." onClick={() => handleAddBlock('container', 'gallery-slider', 'Karuzela')} />
          </div>
        )}
      </div>

      {/* 🔥 KATEGORIA 3: MOCKUPY SAAS 🔥 */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => setActiveTab(activeTab === 'mockups' ? '' as any : 'mockups')} className={getTabStyle('mockups')}>
          <span>Mockupy SaaS</span><span className="text-lg leading-none">{activeTab === 'mockups' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'mockups' && (
          <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-white/5 animate-in slide-in-from-top-2 duration-300">
             <UICard icon="🌐" title="Okno Przeglądarki" desc="Obrazek w ramce przypominającej system MacOS (Safari)." onClick={() => handleAddBlock('container', 'mockup-browser', 'Przeglądarka')} />
             <UICard icon="📱" title="Smartfon (Pion)" desc="Obrazek osadzony w eleganckiej, zaokrąglonej ramce telefonu." onClick={() => handleAddBlock('container', 'mockup-mobile', 'Smartfon')} />
          </div>
        )}
      </div>

      {/* 🔥 KATEGORIA 4: KSZTAŁTY I MASKI 🔥 */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => setActiveTab(activeTab === 'masks' ? '' as any : 'masks')} className={getTabStyle('masks')}>
          <span>Kształty i Maski</span><span className="text-lg leading-none">{activeTab === 'masks' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'masks' && (
          <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-white/5 animate-in slide-in-from-top-2 duration-300">
             <UICard icon="🦠" title="Płynny Blob" desc="Obraz docięty do nieregularnego, organicznego kształtu." onClick={() => handleAddBlock('img', 'mask-blob', 'Blob')} />
             <UICard icon="⛩️" title="Elegancki Łuk (Arch)" desc="Zdjęcie z zaokrągloną górą. Idealne do mody i architektury." onClick={() => handleAddBlock('img', 'mask-arch', 'Łuk')} />
          </div>
        )}
      </div>

    </div>
  );
}