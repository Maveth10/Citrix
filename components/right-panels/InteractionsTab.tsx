import React from 'react';

export default function InteractionsTab({ activeBlock, updateActiveBlock, blocks }: any) {
  if (!activeBlock) return null;

  // Funkcja wyciągająca wszystkie bloki określonego typu (np. 'section' lub 'popup')
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
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-right-4 duration-300">
      
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-[#ff4500] uppercase tracking-widest border-b border-[#ff4500]/30 pb-2">Akcja po kliknięciu (Click Event)</h4>
        
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
          
          <div className="flex flex-col gap-2">
            <span className="text-[11px] text-neutral-400 font-semibold">Typ Interakcji:</span>
            <div className="relative">
              <select 
                value={activeBlock.interactionType || ''}
                onChange={e => updateActiveBlock({ interactionType: e.target.value })}
                className="appearance-none w-full bg-black/40 hover:bg-black/60 border border-white/10 text-white text-[11px] font-bold rounded-lg pl-3 pr-8 py-2.5 focus:border-[#ff4500] outline-none transition-all cursor-pointer shadow-inner"
              >
                <option value="">Brak akcji (Zwykły element)</option>
                <option value="url">Otwórz Link (URL)</option>
                <option value="scroll">Przewiń ekran do sekcji</option>
                <option value="open_popup">Otwórz Wyskakujące Okno (Popup)</option>
                <option value="close_popup">Zamknij Wyskakujące Okno</option>
                <option value="custom_js">Uruchom własny kod JS</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[10px]">▼</div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>

          {/* URL */}
          {activeBlock.interactionType === 'url' && (
            <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
               <div className="flex flex-col gap-2">
                 <span className="text-[11px] text-neutral-400 font-semibold">Adres URL:</span>
                 <input type="text" value={activeBlock.actionUrl || ''} onChange={e => updateActiveBlock({ actionUrl: e.target.value })} placeholder="https://..." className="w-full bg-black/40 border border-white/10 text-white font-mono font-bold text-[11px] p-2.5 rounded-lg focus:border-[#ff4500] outline-none shadow-inner transition-colors" />
                 <p className="text-[9px] text-neutral-500">Wskazówka: Możesz użyć <strong>mailto:email@adres.pl</strong> lub <strong>tel:+48123456789</strong>.</p>
               </div>
               <div className="flex flex-col gap-2">
                 <span className="text-[11px] text-neutral-400 font-semibold">Jak otworzyć?</span>
                 <div className="relative">
                   <select value={activeBlock.actionTarget || '_self'} onChange={e => updateActiveBlock({ actionTarget: e.target.value })} className="appearance-none w-full bg-black/40 hover:bg-black/60 border border-white/10 text-white text-[11px] font-bold rounded-lg pl-3 pr-8 py-2 focus:border-[#ff4500] outline-none transition-all cursor-pointer shadow-inner">
                     <option value="_self">W tej samej karcie (_self)</option>
                     <option value="_blank">W nowej karcie (_blank)</option>
                   </select>
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[9px]">▼</div>
                 </div>
               </div>
            </div>
          )}

          {/* SCROLL */}
          {activeBlock.interactionType === 'scroll' && (
            <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] text-neutral-400 font-semibold">Wybierz docelową sekcję:</span>
                <div className="relative">
                  <select value={activeBlock.actionScrollId || ''} onChange={e => updateActiveBlock({ actionScrollId: e.target.value })} className="appearance-none w-full bg-black/40 hover:bg-black/60 border border-white/10 text-white text-[11px] font-bold rounded-lg pl-3 pr-8 py-2.5 focus:border-[#ff4500] outline-none transition-all cursor-pointer shadow-inner">
                     <option value="">-- Wybierz cel --</option>
                     {availableSections.map((sec: any) => (
                       <option key={sec.id} value={sec.id}>{sec.name} (ID: {sec.id})</option>
                     ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[9px]">▼</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-black/30 rounded-xl border border-white/5 group hover:border-[#ff4500]/30 transition-colors">
                 <div>
                   <span className="text-[10px] text-neutral-300 font-bold block mb-0.5">Płynne przewijanie</span>
                   <span className="text-[8px] text-neutral-500 block">Smooth Scroll Behavior</span>
                 </div>
                 <button 
                   onClick={() => updateActiveBlock({ actionSmoothScroll: activeBlock.actionSmoothScroll === false ? true : false })} 
                   className={`w-10 h-5 rounded-full relative transition-all duration-300 shadow-inner border border-white/10 ${activeBlock.actionSmoothScroll !== false ? 'bg-[#ff4500]' : 'bg-black/50'}`}
                 >
                   <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-md transition-all duration-300 ${activeBlock.actionSmoothScroll !== false ? 'left-5' : 'left-1 opacity-50'}`}></div>
                 </button>
              </div>
            </div>
          )}

          {/* POPUPY */}
          {activeBlock.interactionType === 'open_popup' && (
            <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] text-neutral-400 font-semibold">Który Popup wyświetlić?</span>
                <div className="relative">
                  <select value={activeBlock.actionPopupId || ''} onChange={e => updateActiveBlock({ actionPopupId: e.target.value })} className="appearance-none w-full bg-black/40 hover:bg-black/60 border border-white/10 text-white text-[11px] font-bold rounded-lg pl-3 pr-8 py-2.5 focus:border-[#ff4500] outline-none transition-all cursor-pointer shadow-inner">
                     <option value="">-- Wybierz popup z listy --</option>
                     {availablePopups.map((pop: any) => (
                       <option key={pop.id} value={pop.id}>{pop.name || 'Popup'} (ID: {pop.id})</option>
                     ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[9px]">▼</div>
                </div>
              </div>
            </div>
          )}

          {/* CUSTOM JS */}
          {activeBlock.interactionType === 'custom_js' && (
            <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] text-[#00f2ff] font-semibold">Kod JavaScript:</span>
                <textarea 
                  value={activeBlock.actionJs || ''} 
                  onChange={e => updateActiveBlock({ actionJs: e.target.value })} 
                  placeholder="alert('Witaj świecie!');" 
                  className="w-full bg-black/60 border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-[10px] p-2.5 rounded-lg focus:border-[#00f2ff] outline-none transition-colors shadow-inner min-h-[100px]" 
                />
                <p className="text-[9px] text-neutral-500 leading-tight">Uważaj! Ten kod wykona się bezpośrednio w przeglądarce użytkownika po kliknięciu.</p>
              </div>
            </div>
          )}

          {/* INFO BRAK AKCJI */}
          {!activeBlock.interactionType && (
            <p className="text-[10px] text-neutral-500 text-center py-2 animate-in fade-in duration-200">
              Ten element zachowuje się jak zwykły tag HTML. Nic się nie wydarzy po jego kliknięciu.
            </p>
          )}

        </div>
      </div>

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
         <p className="text-[9px] text-neutral-400 leading-relaxed text-center">
           Wskazówka: Akcje (np. przekierowania lub popupy) działają w pełni tylko po wyeksportowaniu strony (w czystym pliku HTML), aby zapobiec przypadkowemu klikaniu podczas pracy w edytorze.
         </p>
      </div>

    </div>
  );
}