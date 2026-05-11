import React, { useState, useEffect } from 'react';

interface MediaManagerProps {
  activeBlock: any;
  updateActiveBlock: (updates: any, skipHistory?: boolean, specificId?: number) => void;
  setIsMediaManagerOpen: (val: boolean) => void;
}

export default function MediaManager({ activeBlock, updateActiveBlock, setIsMediaManagerOpen }: MediaManagerProps) {
  const [query, setQuery] = useState('cyberpunk');
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 🔥 TUTAJ WKLEJ SWÓJ KLUCZ API Z UNSPLASH 🔥
  // Możesz go wygenerować za darmo na stronie: https://unsplash.com/developers
  const UNSPLASH_ACCESS_KEY = 'Lq2Ac98VdZ_O0RF3RKiuCplmbMbVyTQzcHxmo3UFPNI'; 

  const searchUnsplash = async (searchQuery: string) => {
    setLoading(true);
    setError('');
    
    try {
      if (UNSPLASH_ACCESS_KEY === 'WPISZ_SWOJ_KLUCZ_API_UNSPLASH') {
        // Tryb demonstracyjny (Fallback) dopóki nie wpiszesz swojego klucza API
        setImages([
          { id: 1, urls: { regular: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1080&auto=format&fit=crop' }, alt_description: 'Cyber city', user: { name: 'Demo User' } },
          { id: 2, urls: { regular: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1080&auto=format&fit=crop' }, alt_description: 'Code', user: { name: 'Demo User' } },
          { id: 3, urls: { regular: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1080&auto=format&fit=crop' }, alt_description: 'Setup', user: { name: 'Demo User' } },
          { id: 4, urls: { regular: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop' }, alt_description: 'Earth', user: { name: 'Demo User' } },
          { id: 5, urls: { regular: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1080&auto=format&fit=crop' }, alt_description: 'Matrix', user: { name: 'Demo User' } },
          { id: 6, urls: { regular: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1080&auto=format&fit=crop' }, alt_description: 'Cyberpunk', user: { name: 'Demo User' } },
          { id: 7, urls: { regular: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1080&auto=format&fit=crop' }, alt_description: 'Abstract', user: { name: 'Demo User' } },
          { id: 8, urls: { regular: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1080&auto=format&fit=crop' }, alt_description: 'Tech', user: { name: 'Demo User' } }
        ]);
        setError('Tryb Demo: Dodaj swój darmowy klucz API z Unsplash w kodzie (UNSPLASH_ACCESS_KEY), aby korzystać z wyszukiwarki na żywo!');
        setLoading(false);
        return;
      }

      const res = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=30&query=${searchQuery}&client_id=${UNSPLASH_ACCESS_KEY}`);
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        setImages(data.results);
      } else {
        setImages([]);
        setError('Brak wyników dla tego hasła. Spróbuj czegoś innego!');
      }
    } catch (err) {
      console.error(err);
      setError('Wystąpił błąd podczas łączenia z API Unsplash. Sprawdź konsolę.');
    }
    setLoading(false);
  };

  useEffect(() => {
    // Odpalamy domyślne wyszukiwanie przy otwarciu okna
    searchUnsplash(query);
  }, []);

  const handleSelectImage = (url: string) => {
    if (!activeBlock) return;
    
    // Sprawdzamy czy to klocek typu obrazek, czy dodajemy zdjęcie jako tło
    if (activeBlock.type === 'img') {
      updateActiveBlock({ src: url }, false, activeBlock.id);
    } else {
      updateActiveBlock({ 
        styles: { 
          ...activeBlock.styles, 
          bgType: 'image', 
          bgImage: url,
        } 
      }, false, activeBlock.id);
    }
    
    setIsMediaManagerOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchUnsplash(query);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999999] flex items-center justify-center p-6 animate-in fade-in duration-300"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
      onClick={() => setIsMediaManagerOpen(false)} // Zamknij po kliknięciu w tło
    >
      <div 
        className="w-full max-w-5xl bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[85vh]"
        onClick={(e) => e.stopPropagation()} // Zapobiega zamknięciu po kliknięciu w samo okno
      >
        
        {/* HEADER: Wyszukiwarka */}
        <div className="p-5 border-b border-white/5 bg-black/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
             </div>
             <div>
               <h2 className="text-sm font-bold text-white uppercase tracking-widest">Biblioteka Mediów</h2>
               <p className="text-[10px] text-neutral-400">Powered by Unsplash API</p>
             </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative group">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Szukaj zdjęć (np. neon, office, nature)..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white outline-none focus:border-[#ff4500] focus:bg-black/50 transition-all shadow-inner"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-[#ff4500] transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <button type="submit" className="hidden">Szukaj</button>
          </form>

          <button onClick={() => setIsMediaManagerOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-neutral-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 border border-white/10 transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* ERROR MESSAGE (np. Info o braku klucza API) */}
        {error && (
          <div className="bg-orange-500/20 border-b border-orange-500/30 p-3 text-center">
            <span className="text-orange-400 text-xs font-bold">{error}</span>
          </div>
        )}

        {/* GALERIA ZDJĘĆ */}
        <div className="flex-1 overflow-y-auto p-6 bg-transparent custom-scrollbar relative">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
               <div className="w-10 h-10 border-4 border-white/10 border-t-[#ff4500] rounded-full animate-spin"></div>
               <span className="text-xs text-neutral-400 uppercase tracking-widest font-bold animate-pulse">Ładowanie zasobów...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-max">
              {images.map((img) => (
                <div 
                  key={img.id} 
                  onClick={() => handleSelectImage(img.urls.regular)}
                  className="group relative aspect-video bg-neutral-900 rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-[#ff4500] transition-all duration-300 shadow-md hover:shadow-[0_10px_30px_rgba(255,69,0,0.3)] hover:-translate-y-1"
                >
                  <img 
                    src={img.urls.regular} 
                    alt={img.alt_description || 'Unsplash image'} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                     <span className="text-[9px] text-white/70 truncate">📷 {img.user?.name || 'Unsplash'}</span>
                  </div>
                  
                  {/* Przycisk użycia, który pojawia się na środku */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[#ff4500] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                      Zastosuj
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* STOPKA */}
        <div className="p-4 border-t border-white/5 bg-black/40 flex justify-between items-center text-[10px] text-neutral-500">
          <span>Wybrany element: <strong className="text-neutral-300">{activeBlock?.name || 'Brak'}</strong></span>
          <span>Dwuklik w edytorze pozwala na szybką podmianę mediów.</span>
        </div>

      </div>
    </div>
  );
}