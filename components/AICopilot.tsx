import React, { useState } from 'react';

interface AICopilotProps {
  activeBlock: any;
  updateActiveBlock: (updates: any) => void;
  setIsAiOpen: (val: boolean) => void;
  handleAddSection: (layout: string) => void;
}

export default function AICopilot({ activeBlock, updateActiveBlock, setIsAiOpen, handleAddSection }: AICopilotProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // LOGIKA KONTEKSTU: Zgadujemy, czego chce użytkownik na podstawie zaznaczenia
  const context = !activeBlock ? 'section' : 
                  (activeBlock.type === 'img' ? 'image' : 
                  (['h1', 'h2', 'p'].includes(activeBlock.type) ? 'text' : 'section'));

  // SYMULACJA ZAPYTAŃ DO API
  const handleGenerate = () => {
    if (!prompt && context === 'section') return;
    setIsGenerating(true);

    setTimeout(() => {
      if (context === 'text') {
        updateActiveBlock({ text: `✨ [Wersja AI]: To jest wygenerowany, ulepszony tekst na podstawie Twojego promptu. Brzmi dużo bardziej profesjonalnie i konwertująco!` });
      } else if (context === 'image') {
        updateActiveBlock({ src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe' }); // Zwraca futurystyczny obraz z Unsplash
      } else if (context === 'section') {
        // Symulacja: AI decyduje, że chce układ 3-kolumnowy
        handleAddSection('grid-3');
      }
      setIsGenerating(false);
      setIsAiOpen(false);
    }, 1500); // 1.5 sekundy udawanego "myślenia" AI
  };

  return (
    <div className="absolute top-20 right-6 w-[360px] bg-[#0c0c0e]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-2xl z-[999] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-4">
      
      {/* HEADER WTYCZKI */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">✨</span>
          <div>
            <h3 className="text-sm font-bold text-white">AI Copilot</h3>
            <p className="text-[10px] text-blue-300 font-mono tracking-widest uppercase">
              Kontekst: {context === 'section' ? 'Tworzenie Układów' : context === 'text' ? 'Copywriting' : 'Generowanie Grafik'}
            </p>
          </div>
        </div>
        <button onClick={() => setIsAiOpen(false)} className="text-neutral-500 hover:text-white transition-colors">✕</button>
      </div>

      {/* WORKSPACE */}
      <div className="p-5 flex flex-col gap-4">
        
        {/* WIDOK: TWORZENIE SEKCJI */}
        {context === 'section' && (
          <>
            <p className="text-xs text-neutral-400">Opisz, jaką sekcję chcesz zbudować. Ja przygotuję dla niej odpowiedni układ HTML/CSS.</p>
            <textarea 
              value={prompt} onChange={(e) => setPrompt(e.target.value)}
              placeholder="np. Ciemna sekcja z cennikiem, 3 kolumny, z niebieskimi przyciskami..."
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500 resize-none h-24 shadow-inner"
            />
          </>
        )}

        {/* WIDOK: EDYCJA TEKSTU */}
        {context === 'text' && (
          <>
            <p className="text-xs text-neutral-400">Wybierz szybką akcję dla zaznaczonego tekstu lub wpisz własne instrukcje poniżej.</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={handleGenerate} className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg py-2 text-[10px] font-bold text-neutral-300 transition-colors">Wydłuż tekst</button>
              <button onClick={handleGenerate} className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg py-2 text-[10px] font-bold text-neutral-300 transition-colors">Skróć tekst</button>
              <button onClick={handleGenerate} className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg py-2 text-[10px] font-bold text-neutral-300 transition-colors">Ton profesjonalny</button>
              <button onClick={handleGenerate} className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg py-2 text-[10px] font-bold text-neutral-300 transition-colors">Popraw błędy</button>
            </div>
            <input 
              type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}
              placeholder="Inne polecenie..."
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500 shadow-inner mt-2"
            />
          </>
        )}

        {/* WIDOK: OBRAZY */}
        {context === 'image' && (
          <>
            <p className="text-xs text-neutral-400">Wygeneruj nowy obraz i podmień zaznaczony. Zasilane przez model dyfuzyjny.</p>
            <textarea 
              value={prompt} onChange={(e) => setPrompt(e.target.value)}
              placeholder="np. Cyberpunkowe miasto w deszczu, neonowe światła, fotorealizm..."
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500 resize-none h-24 shadow-inner"
            />
          </>
        )}

        <button 
          onClick={handleGenerate}
          disabled={isGenerating || (!prompt && context !== 'text')}
          className="w-full mt-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? <span className="animate-spin text-lg leading-none">⚙️</span> : <span>✨</span>}
          {isGenerating ? 'Generowanie...' : 'Uruchom AI'}
        </button>
      </div>
    </div>
  );
}