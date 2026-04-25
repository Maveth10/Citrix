import React, { useState } from 'react';

interface MediaManagerProps {
  activeBlock: any;
  updateActiveBlock: (updates: any) => void;
  setIsMediaManagerOpen: (isOpen: boolean) => void;
}

export default function MediaManager({ activeBlock, updateActiveBlock, setIsMediaManagerOpen }: MediaManagerProps) {
  // Lokalny stan wtyczki - Płyta główna nie musi już tego śledzić!
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);

  if (!activeBlock || !activeBlock.images) return null;

  const images = activeBlock.images;

  // --- LOKALNE FUNKCJE MENEDŻERA ---
  const handleAddMedia = () => {
    const newImages = [...images, 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe'];
    updateActiveBlock({ images: newImages });
    setSelectedMediaIndex(newImages.length - 1);
  };

  const handleUpdateMedia = (url: string) => {
    if (selectedMediaIndex === null) return;
    const newImages = [...images];
    newImages[selectedMediaIndex] = url;
    updateActiveBlock({ images: newImages });
  };

  const handleRemoveMedia = (index: number) => {
    const newImages = images.filter((_: any, i: number) => i !== index);
    updateActiveBlock({ images: newImages });
    if (selectedMediaIndex === index) setSelectedMediaIndex(null);
  };

  const handleMoveMedia = (index: number, dir: 'left' | 'right') => {
    const newImages = [...images];
    if (dir === 'left' && index > 0) {
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      setSelectedMediaIndex(index - 1);
    }
    if (dir === 'right' && index < newImages.length - 1) {
      [newImages[index + 1], newImages[index]] = [newImages[index], newImages[index + 1]];
      setSelectedMediaIndex(index + 1);
    }
    updateActiveBlock({ images: newImages });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center font-sans">
      <div className="bg-white w-[1000px] h-[650px] rounded-xl shadow-2xl flex flex-col text-neutral-800 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* HEADER MODALA */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-200">
          <h2 className="font-bold text-lg">Menedżer Mediów</h2>
          <button onClick={() => { setIsMediaManagerOpen(false); setSelectedMediaIndex(null); }} className="text-neutral-400 hover:text-black font-bold text-xl">✕</button>
        </div>
        
        {/* PASEK NARZĘDZI */}
        <div className="flex justify-between items-center px-6 py-3 border-b border-neutral-200 bg-neutral-50">
          <div className="flex gap-4 text-sm text-neutral-500">
            <span className="text-neutral-800 font-bold">Wybrano {selectedMediaIndex !== null ? 1 : 0}</span>
            <button onClick={() => setSelectedMediaIndex(null)} className="hover:text-blue-600">Odznacz</button>
            <button onClick={() => selectedMediaIndex !== null && handleRemoveMedia(selectedMediaIndex)} className={`hover:text-red-600 ${selectedMediaIndex === null ? 'opacity-50 cursor-not-allowed' : ''}`}>Usuń</button>
          </div>
          <button onClick={handleAddMedia} className="bg-[#1C58F2] hover:bg-blue-600 text-white font-bold py-2 px-6 rounded text-sm transition shadow">+ Dodaj obrazy</button>
        </div>

        {/* WORKSPACE */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* SIATKA OBRAZÓW */}
          <div className="flex-1 p-6 overflow-y-auto bg-white">
            <div className="grid grid-cols-4 gap-6">
              {images.map((img: string, i: number) => (
                <div key={i} onClick={() => setSelectedMediaIndex(i)} className={`relative aspect-square bg-neutral-100 rounded-lg cursor-pointer overflow-hidden transition-all border-2 ${selectedMediaIndex === i ? 'border-[#1C58F2] shadow-lg ring-4 ring-blue-500/20' : 'border-transparent hover:border-neutral-300'}`}>
                  <div className="absolute top-2 left-2 bg-white/80 backdrop-blur w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold text-neutral-600 z-10 shadow-sm">{i + 1}</div>
                  <img src={img} className="w-full h-full object-cover" alt={`Media ${i}`} />
                  
                  {/* Przyciski przesuwania */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 flex justify-between opacity-0 hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); handleMoveMedia(i, 'left'); }} className="text-white hover:text-blue-400 font-bold">◀</button>
                    <button onClick={(e) => { e.stopPropagation(); handleMoveMedia(i, 'right'); }} className="text-white hover:text-blue-400 font-bold">▶</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INSPEKTOR POJEDYNCZEGO ZDJĘCIA (PRAWY PANEL MODALA) */}
          <div className="w-[320px] bg-neutral-50 border-l border-neutral-200 flex flex-col shadow-inner">
            {selectedMediaIndex !== null ? (
              <div className="p-6 flex flex-col gap-6 overflow-y-auto">
                <div className="w-full aspect-video bg-neutral-200 rounded-lg overflow-hidden border border-neutral-300 shadow-sm">
                  <img src={images[selectedMediaIndex]} className="w-full h-full object-cover" alt="Selected media" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-neutral-500">Adres URL Obrazu</label>
                  <textarea value={images[selectedMediaIndex]} onChange={(e) => handleUpdateMedia(e.target.value)} className="w-full p-3 text-xs border border-neutral-300 rounded focus:border-blue-500 outline-none bg-white resize-none shadow-sm" rows={5}/>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 p-6 text-center">
                <div className="text-4xl mb-4">🖼️</div>
                <p className="text-sm font-bold text-neutral-600">Nie wybrano obrazu</p>
                <p className="text-xs mt-2">Kliknij miniaturę, by edytować.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}