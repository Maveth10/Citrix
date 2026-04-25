import React, { useState, useEffect, useRef } from 'react';

interface MediaManagerProps {
  activeBlock: any;
  updateActiveBlock: (updates: any) => void;
  setIsMediaManagerOpen: (isOpen: boolean) => void;
}

export default function MediaManager({ activeBlock, updateActiveBlock, setIsMediaManagerOpen }: MediaManagerProps) {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'project' | 'upload' | 'stock'>('project');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeBlock && (activeBlock.images || activeBlock.type === 'img')) {
      setSelectedMediaIndex(0);
    }
  }, [activeBlock?.id]);

  if (!activeBlock) return null;

  const isSingleImage = activeBlock.type === 'img';
  const images = isSingleImage ? [activeBlock.src || ''] : (activeBlock.images || []);

  const handleUpdateMedia = (url: string) => {
    if (isSingleImage) {
      updateActiveBlock({ src: url });
    } else {
      if (selectedMediaIndex === null) return;
      const newImages = [...images];
      newImages[selectedMediaIndex] = url;
      updateActiveBlock({ images: newImages });
    }
  };

  const handleAddMedia = (url: string = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe') => {
    if (isSingleImage) {
      updateActiveBlock({ src: url }); // Podmienia zdjęcie
      setActiveTab('project');
    } else {
      const newImages = [...images, url];
      updateActiveBlock({ images: newImages });
      setSelectedMediaIndex(newImages.length - 1);
      setActiveTab('project');
    }
  };

  const handleRemoveMedia = (index: number) => {
    if (isSingleImage) return; 
    const newImages = images.filter((_: any, i: number) => i !== index);
    updateActiveBlock({ images: newImages });
    if (selectedMediaIndex === index) setSelectedMediaIndex(null);
  };

  // UPLOAD LOKALNY Z DYSKU (Generuje ObjectURL dla przeglądarki)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      handleAddMedia(localUrl);
    }
  };

  // Symulacja bazy Stock (w pełnej wersji podpinamy tu API Unsplash/Pexels)
  const stockPhotos = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    'https://images.unsplash.com/photo-1555099962-4199c345e5dd',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center font-sans">
      <div className="bg-[#111] w-[1000px] h-[700px] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col text-white overflow-hidden animate-in fade-in zoom-in-95 border border-neutral-800">
        
        {/* HEADER MODALA ZE ZAKŁADKAMI */}
        <div className="flex justify-between items-center px-6 py-0 border-b border-neutral-800 bg-[#161616]">
          <div className="flex gap-6 h-14">
            <button onClick={() => setActiveTab('project')} className={`font-bold text-sm border-b-2 transition ${activeTab === 'project' ? 'border-blue-500 text-blue-400' : 'border-transparent text-neutral-400 hover:text-white'}`}>Pliki Projektu</button>
            <button onClick={() => setActiveTab('upload')} className={`font-bold text-sm border-b-2 transition ${activeTab === 'upload' ? 'border-blue-500 text-blue-400' : 'border-transparent text-neutral-400 hover:text-white'}`}>Wgraj z Dysku</button>
            <button onClick={() => setActiveTab('stock')} className={`font-bold text-sm border-b-2 transition ${activeTab === 'stock' ? 'border-blue-500 text-blue-400' : 'border-transparent text-neutral-400 hover:text-white'}`}>Biblioteka Stock</button>
          </div>
          <button onClick={() => { setIsMediaManagerOpen(false); setSelectedMediaIndex(null); }} className="text-neutral-500 hover:text-white font-bold text-xl">✕</button>
        </div>

        {/* WORKSPACE */}
        <div className="flex flex-1 overflow-hidden bg-[#0A0A0A]">
          
          {/* ZAKŁADKA 1: PLIKI PROJEKTU */}
          {activeTab === 'project' && (
            <>
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="grid grid-cols-4 gap-4">
                  {images.length === 0 && <div className="col-span-4 text-neutral-600 text-center py-20 font-bold">Brak obrazów. Dodaj coś z biblioteki lub dysku.</div>}
                  {images.map((img: string, i: number) => (
                    <div key={i} onClick={() => setSelectedMediaIndex(i)} className={`relative aspect-square bg-neutral-900 rounded-lg cursor-pointer overflow-hidden transition-all border-2 ${selectedMediaIndex === i ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-neutral-800 hover:border-neutral-600'}`}>
                      <img src={img} className="w-full h-full object-cover" alt="Media" />
                    </div>
                  ))}
                </div>
              </div>
              {/* INSPEKTOR POJEDYNCZEGO ZDJĘCIA */}
              <div className="w-[320px] bg-[#111] border-l border-neutral-800 flex flex-col p-6 gap-4">
                {selectedMediaIndex !== null && images[selectedMediaIndex] ? (
                  <>
                    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-neutral-800"><img src={images[selectedMediaIndex]} className="w-full h-full object-contain" /></div>
                    <div>
                      <label className="text-xs font-bold text-neutral-500 uppercase block mb-2">Link do obrazka</label>
                      <textarea value={images[selectedMediaIndex]} onChange={(e) => handleUpdateMedia(e.target.value)} className="w-full p-3 text-xs bg-black border border-neutral-800 rounded focus:border-blue-500 outline-none text-white resize-none" rows={4}/>
                    </div>
                    {!isSingleImage && <button onClick={() => handleRemoveMedia(selectedMediaIndex)} className="py-2 bg-red-900/30 text-red-500 hover:bg-red-600 hover:text-white rounded text-xs font-bold transition mt-auto">Usuń z Galerii</button>}
                  </>
                ) : (
                   <div className="flex-1 flex flex-col items-center justify-center text-neutral-600"><span className="text-4xl mb-2">🖼️</span>Wybierz plik</div>
                )}
              </div>
            </>
          )}

          {/* ZAKŁADKA 2: UPLOAD Z DYSKU */}
          {activeTab === 'upload' && (
            <div className="flex-1 flex items-center justify-center p-10">
              <div className="w-full max-w-md bg-[#161616] border-2 border-dashed border-neutral-700 hover:border-blue-500 rounded-2xl p-10 flex flex-col items-center justify-center text-center transition group">
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">📂</span>
                <h3 className="text-xl font-bold text-white mb-2">Wgraj własne pliki</h3>
                <p className="text-sm text-neutral-500 mb-6">Wspierane formaty: JPG, PNG, SVG, WEBP, MP4.</p>
                <button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg">Przeglądaj Dysk</button>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,video/*" />
              </div>
            </div>
          )}

          {/* ZAKŁADKA 3: STOCK LIBRARY */}
          {activeTab === 'stock' && (
            <div className="flex-1 flex flex-col p-6">
              <div className="flex gap-4 mb-6">
                <input type="text" placeholder="Szukaj w darmowej bibliotece... (np. biuro, natura)" className="flex-1 bg-[#161616] border border-neutral-800 p-3 rounded-lg text-white outline-none focus:border-blue-500" />
                <button className="bg-neutral-800 px-6 font-bold rounded-lg hover:bg-neutral-700">Szukaj</button>
              </div>
              <div className="grid grid-cols-4 gap-4 overflow-y-auto pr-2">
                {stockPhotos.map((url, i) => (
                  <div key={i} className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden group cursor-pointer border border-neutral-800 hover:border-blue-500" onClick={() => handleAddMedia(url)}>
                    <img src={url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded shadow">Użyj zdjęcia</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}