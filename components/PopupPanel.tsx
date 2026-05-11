import React, { useState } from 'react';
import ModalsPanel from './popup-panels/ModalsPanel';
import NotificationsPanel from './popup-panels/NotificationsPanel';

interface PopupPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

type TabType = 'modals' | 'notifications' | null;

export default function PopupPanel({ handleAddBlock }: PopupPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('modals');

  const toggleTab = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const getTabStyle = (tab: TabType) => {
    const isActive = activeTab === tab;
    return `flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
      isActive 
        ? 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30 rounded-b-none' 
        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
    }`;
  };

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: GŁÓWNE MODALE */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('modals')} className={getTabStyle('modals')}>
          <span>Modale (Overlays)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'modals' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'modals' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <ModalsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* KATEGORIA 2: POWIADOMIENIA */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('notifications')} className={getTabStyle('notifications')}>
          <span>Pływające Notyfikacje</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'notifications' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'notifications' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <NotificationsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

    </div>
  );
}