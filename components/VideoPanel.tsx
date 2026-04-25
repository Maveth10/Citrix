import React from 'react';

interface VideoPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function VideoPanel({ handleAddBlock }: VideoPanelProps) {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Odtwarzacze
        </span>
      </div>
      
      {/* KARTOTEKA YOUTUBE */}
      <button 
        onClick={() => handleAddBlock('video', '', 'YouTube Wideo')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-red-500 group text-left w-full"
      >
        {/* Renderowana miniatura odtwarzacza YouTube */}
        <div className="w-full h-24 bg-neutral-900 rounded-md mb-3 flex items-center justify-center group-hover:bg-neutral-800 transition-colors relative overflow-hidden border border-neutral-800">
          <div className="w-10 h-7 bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1"></div>
          </div>
        </div>
        <span className="text-sm font-bold text-white block">YouTube (Poziome)</span>
        <span className="text-[10px] text-neutral-400 block">Klasyczny odtwarzacz 16:9</span>
      </button>

      {/* KARTOTEKA TIKTOK / REELS */}
      <button 
        onClick={() => handleAddBlock('video', 'social', 'Wideo Pionowe')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-fuchsia-500 group text-left w-full flex items-center gap-4"
      >
        {/* Renderowana miniatura pionowego wideo */}
        <div className="w-12 h-20 bg-neutral-900 rounded-md flex items-center justify-center border border-neutral-700 group-hover:border-fuchsia-500 transition-colors shrink-0 shadow-lg">
          <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-1"></div>
        </div>
        <div>
          <span className="text-sm font-bold text-white block leading-tight">Pionowe Wideo</span>
          <span className="text-[10px] text-fuchsia-400 font-bold block mb-1">TikTok / Reels / Shorts</span>
          <span className="text-[9px] text-neutral-500 block leading-tight">Format 9:16 idealny pod smartfony</span>
        </div>
      </button>

      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Złożone Sekcje
        </span>
      </div>

      {/* SKRÓT DO SEKCJI WIDEO HERO */}
      <button 
        onClick={() => handleAddBlock('section', 'video-hero', 'Wideo Hero')} 
        className="p-4 bg-[#111] hover:bg-[#1a1a1a] rounded-lg transition border border-neutral-700 hover:border-blue-500 group text-left w-full relative overflow-hidden"
      >
        {/* Abstrakcyjne tło udające film */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-600 to-purple-900 group-hover:scale-110 transition-transform"></div>
        <div className="relative z-10">
          <span className="text-sm font-bold text-white block mb-1">🎬 Kinowe Tło (Hero)</span>
          <span className="text-[10px] text-neutral-300 block">Wielka sekcja z zapętlonym plikiem .mp4 w tle i miejscem na nagłówek.</span>
        </div>
      </button>

    </div>
  );
}