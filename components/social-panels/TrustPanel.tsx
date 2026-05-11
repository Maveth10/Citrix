import React from 'react';

interface PanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

const UICard = ({ title, desc, icon, onClick }: { title: string, desc: string, icon: string, onClick: () => void }) => (
  <button 
    onClick={onClick} 
    className="p-3 bg-[#1c1c21] hover:bg-[#25252b] border border-white/5 hover:border-pink-500/40 rounded-xl text-left transition-all w-full flex items-center gap-4 group shadow-sm mb-2"
  >
    <div className="w-10 h-10 rounded-lg bg-[#25252b] group-hover:bg-pink-500/20 group-hover:scale-105 flex items-center justify-center text-xl shrink-0 transition-all border border-white/5 text-white">
      {icon}
    </div>
    <div className="flex-1">
      <span className="text-xs font-bold text-neutral-200 block mb-0.5">{title}</span>
      <span className="text-[9px] text-neutral-500 block leading-tight">{desc}</span>
    </div>
  </button>
);

export default function TrustPanel({ handleAddBlock }: PanelProps) {
  return (
    <div className="p-2 bg-black/20 rounded-b-xl border border-t-0 border-white/5">
      <UICard 
        icon="👥" 
        title="Stos Awatarów (Avatar Stack)" 
        desc="Zachodzące na siebie zdjęcia i tekst '+10,000 zadowolonych'." 
        onClick={() => handleAddBlock('container', 'avatar-stack', 'Avatar Stack')} 
      />
      <UICard 
        icon="🏢" 
        title="Zaufali Nam (Logotypy)" 
        desc="Poziomy pasek ze zgaszonymi logotypami znanych firm." 
        onClick={() => handleAddBlock('container', 'logo-cloud', 'Logo Cloud')} 
      />
      <UICard 
        icon="🏆" 
        title="Ocena ze Sklepu" 
        desc="Minimalistyczny blok pokazujący np. '4.9/5 w App Store'." 
        onClick={() => handleAddBlock('container', 'rating-badge', 'Trust Badge')} 
      />
    </div>
  );
}