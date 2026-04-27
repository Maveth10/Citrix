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

  const context = !activeBlock ? 'section' : 
                  (activeBlock.type === 'img' ? 'image' : 
                  (['h1', 'h2', 'p', 'button', 'alert'].includes(activeBlock.type) ? 'text' : 'section'));

  const handleGenerate = () => {
    if (!prompt && context === 'section') return;
    setIsGenerating(true);

    setTimeout(() => {
      // 1. ZAAWANSOWANA SYMULACJA TEKSTU
      if (context === 'text') {
        const action = prompt ? `Zastosowano polecenie: "${prompt}"` : `Poprawiono styl i gramatykę`;
        updateActiveBlock({ text: `✨ <strong>[Wersja AI]</strong>: ${action}. Ten tekst jest teraz znacznie bardziej angażujący i dostosowany do nowoczesnych standardów webowych.` });
      } 
      // 2. SYMULACJA GENEROWANIA OBRAZÓW (Losowe piękne stocki)
      else if (context === 'image') {
        const randomImgs = [
          'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce', // Neon
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f', // Retro
          'https://images.unsplash.com/photo-1518770660439-4636190af475', // Chip
          'https://images.unsplash.com/photo-1605810230434-7631ac76ec81'  // AI Brain
        ];
        const randomImg = randomImgs[Math.floor(Math.random() * randomImgs.length)];
        updateActiveBlock({ src: randomImg });
      } 
      // 3. SYMULACJA GENEROWANIA UKŁADÓW (Losowa struktura)
      else if (context === 'section') {
        const layouts = ['grid-2', 'grid-3', 'grid-left', 'flex-col'];
        const randomLayout = layouts[Math.floor(Math.random() * layouts.length)];
        handleAddSection(randomLayout);
      }
      
      setIsGenerating(false);
      setIsAiOpen(false);
      setPrompt(''); // Czyścimy okienko po wygenerowaniu
    }, 1500);
  };

  return (
    <div className="absolute top-20 right-6 w-[360px] bg-[#0c0c0e]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-2xl z-[999] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-4">
      
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

      <div className="p-5 flex flex-col gap-4">
        {context === 'section' && (
          <>
            <p className="text-xs text-neutral-400">Opisz, jaką sekcję chcesz zbudować. Ja przygotuję dla niej odpowiedni układ HTML/CSS.</p>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="np. Ciemna sekcja z cennikiem, 3 kolumny..." className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500 resize-none h-24 shadow-inner" />
          </>
        )}

        {context === 'text' && (
          <>
            <p className="text-xs text-neutral-400">Wybierz szybką akcję dla zaznaczonego tekstu lub wpisz własne instrukcje poniżej.</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setPrompt('Wydłuż ten tekst'); handleGenerate(); }} className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg py-2 text-[10px] font-bold text-neutral-300 transition-colors">Wydłuż tekst</button>
              <button onClick={() => { setPrompt('Skróć tekst do minimum'); handleGenerate(); }} className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg py-2 text-[10px] font-bold text-neutral-300 transition-colors">Skróć tekst</button>
              <button onClick={() => { setPrompt('Napisz to profesjonalnie'); handleGenerate(); }} className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg py-2 text-[10px] font-bold text-neutral-300 transition-colors">Ton profesjonalny</button>
              <button onClick={() => { setPrompt('Popraw błędy ortograficzne'); handleGenerate(); }} className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg py-2 text-[10px] font-bold text-neutral-300 transition-colors">Popraw błędy</button>
            </div>
            <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Inne polecenie..." className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500 shadow-inner mt-2" />
          </>
        )}

        {context === 'image' && (
          <>
            <p className="text-xs text-neutral-400">Wygeneruj nowy obraz i podmień zaznaczony. Zasilane przez model dyfuzyjny.</p>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="np. Cyberpunkowe miasto w deszczu..." className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500 resize-none h-24 shadow-inner" />
          </>
        )}

        <button 
          onClick={handleGenerate} disabled={isGenerating || (!prompt && context !== 'text')}
          className="w-full mt-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? <span className="animate-spin text-lg leading-none">⚙️</span> : <span>✨</span>}
          {isGenerating ? 'Generowanie...' : 'Uruchom AI'}
        </button>
      </div>
    </div>
  );
}