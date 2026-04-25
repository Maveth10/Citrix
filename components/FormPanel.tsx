import React from 'react';

interface FormPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function FormPanel({ handleAddBlock }: FormPanelProps) {
  return (
    <div className="flex flex-col gap-4 pb-10">
      
      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Główny Kontener (Wymagany)
        </span>
      </div>

      <button 
        onClick={() => handleAddBlock('form', '', 'Formularz Kontaktowy')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-emerald-500 group text-left w-full relative overflow-hidden"
      >
        {/* Renderowana miniatura formularza */}
        <div className="w-full h-24 bg-white rounded-md mb-3 p-3 flex flex-col gap-2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
           <div className="w-full h-4 bg-neutral-200 rounded-sm border border-neutral-300"></div>
           <div className="w-full h-8 bg-neutral-200 rounded-sm border border-neutral-300"></div>
           <div className="w-1/2 h-5 bg-blue-500 rounded self-end mt-auto shadow-sm"></div>
        </div>
        
        <span className="text-sm font-bold text-white block mb-1">Pudło Formularza</span>
        <span className="text-[10px] text-emerald-400 font-bold block mb-1">Akcja: Zapis Leadów do bazy</span>
        <span className="text-[9px] text-neutral-400 block leading-tight">Wstaw ten blok, a następnie wrzuć do niego Pola i Przycisk. Tyle wystarczy, by zbierać maile!</span>
      </button>

      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Pola Wprowadzania
        </span>
      </div>

      <button 
        onClick={() => handleAddBlock('input', '', 'Pole Tekstowe')} 
        className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-neutral-400 group text-left w-full flex items-center gap-3"
      >
        <div className="w-8 h-8 bg-neutral-900 border border-neutral-600 rounded flex items-center justify-center text-xs text-neutral-400 font-serif italic group-hover:border-white transition-colors">Ab</div>
        <div>
          <span className="text-sm font-bold text-white block">Krótkie Pole (Input)</span>
          <span className="text-[9px] text-neutral-500 block">E-mail, Imię, Telefon</span>
        </div>
      </button>

      <button 
        onClick={() => handleAddBlock('textarea', '', 'Wiadomość')} 
        className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-neutral-400 group text-left w-full flex items-center gap-3"
      >
        <div className="w-8 h-8 bg-neutral-900 border border-neutral-600 rounded flex items-start justify-center pt-1 text-xs text-neutral-400 font-serif group-hover:border-white transition-colors">¶</div>
        <div>
          <span className="text-sm font-bold text-white block">Długi Tekst (Textarea)</span>
          <span className="text-[9px] text-neutral-500 block">Treść wiadomości, opisy</span>
        </div>
      </button>

      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Lokalizacja
        </span>
      </div>

      <button 
        onClick={() => handleAddBlock('map', '', 'Mapa Google')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-blue-400 group text-left w-full flex items-center gap-3"
      >
         <span className="text-2xl group-hover:scale-110 transition-transform">🗺️</span>
         <div>
           <span className="text-sm font-bold text-white block">Interaktywna Mapa</span>
           <span className="text-[9px] text-neutral-400 block">Wymaga linku z Google Maps</span>
         </div>
      </button>

    </div>
  );
}