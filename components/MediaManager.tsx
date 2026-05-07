import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabase';

interface MediaManagerProps {
  activeBlock: any;
  updateActiveBlock: (updates: any) => void;
  setIsMediaManagerOpen: (val: boolean) => void;
}

export default function MediaManager({ activeBlock, updateActiveBlock, setIsMediaManagerOpen }: MediaManagerProps) {
  const [files, setFiles] = useState<{ name: string, url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Pobieranie plików z Supabase (bucket: 'media')
  const fetchMedia = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from('media').list();
    
    if (error) {
      console.error('Błąd pobierania mediów:', error);
      setLoading(false);
      return;
    }

    if (data) {
      // Filtrujemy ukryte pliki (np. .emptyFolderPlaceholder) i mapujemy na publiczne URL
      const validFiles = data.filter(f => f.name && !f.name.startsWith('.'));
      const fileData = validFiles.map(file => {
        const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(file.name);
        return { name: file.name, url: publicUrlData.publicUrl };
      });
      
      // Sortujemy od najnowszych (na podstawie domyślnego zachowania)
      setFiles(fileData.reverse());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // 2. Upload pliku do Supabase
  const handleUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);

    // Unikalna nazwa pliku zabezpieczająca przed nadpisaniem
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const { error } = await supabase.storage.from('media').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

    if (error) {
      alert(`Błąd wgrywania: ${error.message}`);
    } else {
      await fetchMedia(); // Odśwież galerię po udanym uploadzie
    }
    setUploading(false);
  };

  // 3. Obsługa zdarzeń Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  // 4. Wybór zdjęcia i wstrzyknięcie do płótna
  const handleSelectImage = (url: string) => {
    if (!activeBlock) return;
    
    // Zabezpieczenie: Czy to obrazek/wideo, czy ustawiamy tło kontenera?
    if (activeBlock.type === 'img' || activeBlock.type === 'video') {
      updateActiveBlock({ src: url });
    } else {
      updateActiveBlock({ styles: { bgImage: url, bgType: 'image' } });
    }
    
    setIsMediaManagerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-300">
      
      {/* Tło przyciemniające (Dark Backdrop) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsMediaManagerOpen(false)}
      ></div>

      {/* Główne okno Menedżera - Cyber Szkło */}
      <div className="relative w-[900px] h-[80vh] max-h-[800px] bg-[rgba(15,15,20,0.8)] backdrop-blur-[40px] saturate-[150%] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden scale-100 animate-in zoom-in-95 duration-300">
        
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shadow-inner">
              <span className="text-xl">🌌</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg tracking-wide">Menedżer Mediów</h2>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Zarządzaj plikami w chmurze</p>
            </div>
          </div>
          <button 
            onClick={() => setIsMediaManagerOpen(false)} 
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide flex flex-col gap-6">
          
          {/* STREFA ZRZUTU (DRAG & DROP) */}
          <div 
            onDragEnter={handleDrag} 
            onDragLeave={handleDrag} 
            onDragOver={handleDrag} 
            onDrop={handleDrop}
            className={`w-full h-40 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer ${
              dragActive 
                ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)] scale-[1.02]' 
                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*,video/*" 
              className="hidden" 
            />
            
            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest animate-pulse">Wysyłanie w kosmos...</span>
              </div>
            ) : (
              <>
                <span className="text-4xl mb-2 transition-transform duration-300 group-hover:-translate-y-2">☁️</span>
                <p className="text-sm font-bold text-white mb-1">Przeciągnij i upuść pliki tutaj</p>
                <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">lub kliknij, aby przeglądać dysk</p>
              </>
            )}
            
            {/* Animowany blask na hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:animate-[shine_1.5s_ease-in-out_infinite] pointer-events-none"></div>
          </div>

          {/* GALERIA PLIKÓW */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">
              Twoja Biblioteka
            </h3>
            
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <span className="text-xs font-mono text-neutral-500 animate-pulse">Ładowanie bazy danych...</span>
              </div>
            ) : files.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 border border-white/5 rounded-xl bg-white/[0.02]">
                <span className="text-2xl mb-2 opacity-30">🏜️</span>
                <span className="text-xs font-mono text-neutral-500">Pustynia. Czas coś wgrać.</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {files.map((file, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleSelectImage(file.url)}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/50 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:border-white/30 hover:-translate-y-1 transition-all duration-300"
                  >
                    <img 
                      src={file.url} 
                      alt={file.name} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    />
                    {/* Nakładka przy najechaniu */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest drop-shadow-md">Wybierz</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}