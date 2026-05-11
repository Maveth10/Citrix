import React from 'react';

export default function InteractionsTab({ activeBlock, updateActiveBlock, blocks }: any) {
  const getAllBlocksByType = (arr: any[], type: string): any[] => {
    let res: any[] = [];
    arr.forEach(b => {
      if (b.type === type) res.push(b);
      if (b.children) res = res.concat(getAllBlocksByType(b.children, type));
    });
    return res;
  };

  const availableSections = getAllBlocksByType(blocks || [], 'section');
  const availablePopups = getAllBlocksByType(blocks || [], 'popup');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <label className="text-[10px] font-bold text-[#ff4500] uppercase tracking-widest mb-3 block border-b border-[#ff4500]/30 pb-2">Akcja po kliknięciu</label>
        
        <select 
          value={activeBlock.interactionType || ''}
          onChange={e => updateActiveBlock({ interactionType: e.target.value })}
          className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white outline-none focus:border-[#ff4500] shadow-inner mb-4 transition-colors cursor-pointer"
        >
          <option value="">Brak akcji (Zwykły element)</option>
          <option value="url">Otwórz Link (URL)</option>
          <option value="scroll">Przewiń ekran do sekcji</option>
          <option value="open_popup">Otwórz Wyskakujące Okno (Popup)</option>
          <option value="close_popup">Zamknij Wyskakujące Okno</option>
        </select>

        {activeBlock.interactionType === 'url' && (
          <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
             <div>
               <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1 block">Podaj Link URL</label>
               <input type="text" value={activeBlock.actionUrl || ''} onChange={e => updateActiveBlock({ actionUrl: e.target.value })} placeholder="https://..." className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-blue-500 transition-colors" />
             </div>
             <div>
               <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1 block">Jak otworzyć?</label>
               <select value={activeBlock.actionTarget || '_self'} onChange={e => updateActiveBlock({ actionTarget: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-blue-500 transition-colors cursor-pointer">
                 <option value="_self">W tej samej karcie</option>
                 <option value="_blank">W nowej karcie</option>
               </select>
             </div>
          </div>
        )}

        {activeBlock.interactionType === 'scroll' && (
          <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1 block">Wybierz docelową sekcję na stronie</label>
            <select value={activeBlock.actionScrollId || ''} onChange={e => updateActiveBlock({ actionScrollId: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-blue-500 transition-colors cursor-pointer">
               <option value="">-- Wybierz cel --</option>
               {availableSections.map((sec: any) => (
                 <option key={sec.id} value={sec.id}>{sec.name} (ID: {sec.id})</option>
               ))}
            </select>
          </div>
        )}

        {activeBlock.interactionType === 'open_popup' && (
          <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1 block">Który Popup wyświetlić?</label>
            <select value={activeBlock.actionPopupId || ''} onChange={e => updateActiveBlock({ actionPopupId: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-purple-500 transition-colors cursor-pointer">
               <option value="">-- Wybierz popup z listy --</option>
               {availablePopups.map((pop: any) => (
                 <option key={pop.id} value={pop.id}>{pop.name}</option>
               ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}