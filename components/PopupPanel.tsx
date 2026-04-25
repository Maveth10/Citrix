import React from 'react';

interface PopupPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function PopupPanel({ handleAddBlock }: PopupPanelProps) {
  return (
    <div className="flex flex-col gap-4 pb-10">
      
      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Nakładki na Ekran
        </span>
      </div>

      <button 
        onClick={() => handleAddBlock('popup', 'modal', 'Klasyczny Modal')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-blue-500 group text-left w-full relative overflow-hidden"
      >
        {/* Wizualizacja Modala na środku */}
        <div className="w-full h-20 bg-neutral-900 border border-neutral-700 rounded mb-3 flex items-center justify-center relative">
           <div className="absolute inset-0 bg-black/40"></div>
           <div className="w-12 h-10 bg-white rounded shadow-lg relative z-10 group-hover:scale-110 transition-transform"></div>
        </div>
        <span className="text-sm font-bold text-white block mb-1">Klasyczny Modal</span>
        <span className="text-[10px] text-neutral-400 block leading-tight">Pojawia się na samym środku ekranu, przyciemniając tło za nim.</span>
      </button>

      <button 
        onClick={() => handleAddBlock('popup', 'toast', 'Powiadomienie')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-emerald-500 group text-left w-full relative overflow-hidden"
      >
        {/* Wizualizacja Toasta w prawym dolnym rogu */}
        <div className="w-full h-20 bg-neutral-900 border border-neutral-700 rounded mb-3 relative">
           <div className="absolute bottom-2 right-2 w-10 h-6 bg-neutral-700 rounded shadow group-hover:bg-emerald-500 transition-colors"></div>
        </div>
        <span className="text-sm font-bold text-white block mb-1">Powiadomienie (Toast)</span>
        <span className="text-[10px] text-neutral-400 block leading-tight">Dyskretne okienko w prawym dolnym rogu (np. zapisano pomyślnie).</span>
      </button>

      <button 
        onClick={() => handleAddBlock('popup', 'banner', 'Pasek Cookies')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-yellow-500 group text-left w-full relative overflow-hidden"
      >
        {/* Wizualizacja paska na dole */}
        <div className="w-full h-20 bg-neutral-900 border border-neutral-700 rounded mb-3 relative">
           <div className="absolute bottom-0 left-0 w-full h-4 bg-yellow-500 shadow transition-all group-hover:h-6"></div>
        </div>
        <span className="text-sm font-bold text-white block mb-1">Dolny Pasek (Banner)</span>
        <span className="text-[10px] text-neutral-400 block leading-tight">Pasek przyklejony do samego dołu ekranu. Idealny na politykę prywatności.</span>
      </button>

    </div>
  );
}