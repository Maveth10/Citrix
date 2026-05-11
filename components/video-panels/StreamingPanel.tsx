import React from 'react';

interface PanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

const UICard = ({ title, desc, icon, onClick }: { title: string, desc: string, icon: string, onClick: () => void }) => (
  <button 
    onClick={onClick} 
    className="p-3 bg-[#1c1c21] hover:bg-[#25252b] border border-white/5 hover:border-cyan-500/40 rounded-xl text-left transition-all w-full flex items-center gap-4 group shadow-sm mb-2"
  >
    <div className="w-10 h-10 rounded-lg bg-[#25252b] group-hover:bg-cyan-500/20 group-hover:scale-105 flex items-center justify-center text-xl shrink-0 transition-all border border-white/5">
      {icon}
    </div>
    <div className="flex-1">
      <span className="text-xs font-bold text-neutral-200 block mb-0.5">{title}</span>
      <span className="text-[9px] text-neutral-500 block leading-tight">{desc}</span>
    </div>
  </button>
);

export default function StreamingPanel({ handleAddBlock }: PanelProps) {
  return (
    <div className="p-2 bg-black/20 rounded-b-xl border border-t-0 border-white/5">
      <UICard 
        icon="🟥" 
        title="YouTube Player" 
        desc="Klasyczny odtwarzacz wideo z YouTube (16:9)." 
        onClick={() => handleAddBlock('video', 'youtube', 'YouTube')} 
      />
      <UICard 
        icon="🟦" 
        title="Vimeo Premium" 
        desc="Czysty odtwarzacz Vimeo, idealny dla kursów i portfolio." 
        onClick={() => handleAddBlock('video', 'vimeo', 'Vimeo')} 
      />
      <UICard 
        icon="📱" 
        title="Shorts / TikTok (Pionowe)" 
        desc="Wideo w proporcji 9:16, zoptymalizowane pod telefony." 
        onClick={() => handleAddBlock('video', 'vertical', 'Pionowe Wideo')} 
      />
    </div>
  );
}