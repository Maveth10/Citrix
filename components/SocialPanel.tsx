import React from 'react';

interface SocialPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function SocialPanel({ handleAddBlock }: SocialPanelProps) {
  return (
    <div className="flex flex-col gap-4 pb-10">
      
      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Odnośniki i Akcje
        </span>
      </div>

      <button
        onClick={() => handleAddBlock('social', '', 'Ikonki Social')}
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-blue-400 group text-left w-full"
      >
        <div className="flex gap-3 text-2xl mb-2 group-hover:scale-110 transition-transform origin-left">
          📘 📸 🐦
        </div>
        <span className="text-sm font-bold text-white block mb-1">Ikonki Social Media</span>
        <span className="text-[10px] text-neutral-400 block leading-tight">Pasek z ikonami kierującymi do Twoich profili społecznościowych.</span>
      </button>

      <button
        onClick={() => handleAddBlock('button', 'share', 'Pasek Udostępniania')}
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-emerald-500 group text-left w-full"
      >
        <div className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-full mb-3 text-center group-hover:bg-emerald-500 transition-colors shadow-lg">
          🔗 Udostępnij stronę
        </div>
        <span className="text-sm font-bold text-white block mb-1">Przycisk Udostępniania</span>
        <span className="text-[10px] text-neutral-400 block leading-tight">Gotowy przycisk wywołujący mobilne lub systemowe okno udostępniania (Web Share API).</span>
      </button>

      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Integracje (Feedy)
        </span>
      </div>

      <button
        onClick={() => handleAddBlock('grid', 'insta', 'Kanał Insta')}
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-pink-500 group text-left w-full"
      >
        {/* Wizualizacja kanału Instagram (brak odstępów, 3 kolumny) */}
        <div className="w-full grid grid-cols-3 gap-[2px] mb-3 border border-neutral-700 rounded overflow-hidden">
          <div className="aspect-square bg-neutral-600 group-hover:bg-pink-400/50 transition-colors delay-75"></div>
          <div className="aspect-square bg-neutral-700 group-hover:bg-pink-400/80 transition-colors delay-100"></div>
          <div className="aspect-square bg-neutral-600 group-hover:bg-pink-400/50 transition-colors delay-150"></div>
          <div className="aspect-square bg-neutral-700 group-hover:bg-pink-400/80 transition-colors delay-200"></div>
          <div className="aspect-square bg-neutral-600 group-hover:bg-pink-400/50 transition-colors delay-300"></div>
          <div className="aspect-square bg-neutral-700 group-hover:bg-pink-400/80 transition-colors delay-500"></div>
        </div>
        <span className="text-sm font-bold text-white block mb-1">Siatka Instagram</span>
        <span className="text-[10px] text-neutral-400 block leading-tight">Gotowy layout klasycznej siatki profilowej (3 kolumny, kwadratowe zdjęcia).</span>
      </button>

    </div>
  );
}