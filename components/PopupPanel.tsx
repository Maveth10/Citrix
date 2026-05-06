import React, { useState } from 'react';
import ModalsPanel from './popup-panels/ModalsPanel';
import NotificationsPanel from './popup-panels/NotificationsPanel';

interface PopupPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function PopupPanel({ handleAddBlock }: PopupPanelProps) {
  const [activeTab, setActiveTab] = useState<'modals' | 'notifications'>('modals');

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: GŁÓWNE MODALE */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'modals' ? '' as any : 'modals')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'modals' ? 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Modale (Overlays)</span>
          <span className="text-lg leading-none">{activeTab === 'modals' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'modals' && <ModalsPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 2: POWIADOMIENIA */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'notifications' ? '' as any : 'notifications')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'notifications' ? 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Pływające Notyfikacje</span>
          <span className="text-lg leading-none">{activeTab === 'notifications' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'notifications' && <NotificationsPanel handleAddBlock={handleAddBlock} />}
      </div>

    </div>
  );
}