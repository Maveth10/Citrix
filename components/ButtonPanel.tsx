import React, { useState } from 'react';
import PrimaryButtonsPanel from './button-panels/PrimaryButtonsPanel';
import SecondaryButtonsPanel from './button-panels/SecondaryButtonsPanel';

interface ButtonPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

// Zmieniony typ: dopuszczamy 'null' dla stanu, gdy wszystko jest zamknięte
type TabType = 'primary' | 'secondary' | null;

export default function ButtonPanel({ handleAddBlock }: ButtonPanelProps) {
  // Domyślnie otwieramy 'primary'
  const [activeTab, setActiveTab] = useState<TabType>('primary');

  // Funkcja pomocnicza do przełączania (czysty TypeScript, zero "as any")
  const toggleTab = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: GŁÓWNE AKCJE */}
      <div className="flex flex-col">
        <button 
          onClick={() => toggleTab('primary')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
            activeTab === 'primary' 
              ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30 rounded-b-none' 
              : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
          }`}
        >
          <span>Główne Akcje (CTA)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'primary' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        
        {/* Kontener zawartości z prostą animacją wejścia */}
        {activeTab === 'primary' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <PrimaryButtonsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* KATEGORIA 2: POBOCZNE & SSO */}
      <div className="flex flex-col">
        <button 
          onClick={() => toggleTab('secondary')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
            activeTab === 'secondary' 
              ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30 rounded-b-none' 
              : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
          }`}
        >
          <span>Poboczne & Logowanie</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'secondary' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        
        {activeTab === 'secondary' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <SecondaryButtonsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

    </div>
  );
}