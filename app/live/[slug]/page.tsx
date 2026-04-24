'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';

export default function LivePage({ params }: { params: { slug: string } }) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      // Szukamy w bazie strony o nazwie z adresu URL
      const { data, error } = await supabase
        .from('pages')
        .select('content')
        .eq('slug', params.slug)
        .single();

      if (data && data.content) {
        setBlocks(data.content);
      }
      setLoading(false);
    };

    fetchPage();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#F0F1F5]">
        <div className="animate-pulse text-blue-500 font-mono text-sm tracking-widest uppercase">
          Ładowanie struktury...
        </div>
      </div>
    );
  }

  if (blocks.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#F0F1F5]">
        <div className="text-red-500 font-mono text-sm border border-red-200 p-6 rounded bg-red-50 shadow-sm text-center">
          <b className="block text-lg mb-2">Błąd 404</b>
          Strona <span className="font-bold text-red-700">"{params.slug}"</span> nie istnieje w bazie Supabase.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F0F1F5] flex justify-center py-10 px-8 font-sans">
      {/* Czyste płótno naśladujące szerokość edytora, ale bez obramowań zaznaczenia */}
      <div className="w-full max-w-[1200px] bg-white min-h-[800px] shadow-xl relative p-8 overflow-hidden">
        
        {blocks.map(b => {
          // Nakładamy pozycję na podstawie osi Z
          const pos = b.layering.position === 'absolute' 
            ? { position: 'absolute' as any, top: `${b.layering.top}px`, left: `${b.layering.left}px`, zIndex: b.layering.zIndex } 
            : { position: 'relative' as any, zIndex: b.layering.zIndex };
          
          return (
            <div 
              key={b.id} 
              style={{ ...b.styles, ...pos, margin: pos.position === 'absolute' ? 0 : undefined, marginBottom: pos.position === 'absolute' ? 0 : b.styles.marginBottom }}
            >
              {/* Odwzorowanie elementów kropka w kropkę */}
              {b.type === 'h1' && <h1 style={{ fontSize: b.styles.fontSize, color: b.styles.color, fontWeight: b.styles.fontWeight }}>{b.text}</h1>}
              {b.type === 'p' && <p style={{ fontSize: b.styles.fontSize, color: b.styles.color }}>{b.text}</p>}
              {b.type === 'img' && <img src={b.src} alt="Media" className="w-full h-full object-cover rounded shadow-sm" />}
              {b.type === 'button' && <div className="text-center cursor-pointer shadow-md hover:shadow-lg transition-shadow inline-block" style={{ padding: b.styles.padding, backgroundColor: b.styles.backgroundColor, color: b.styles.color, borderRadius: b.styles.borderRadius }}>{b.text}</div>}
              {b.type === 'alert' && <div className={`p-4 border-l-4 ${b.variant === 'warning' ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-blue-50 border-blue-500 text-blue-700'}`}><b className="block text-[10px] tracking-wider uppercase mb-1">{b.title}</b><span className="text-sm">{b.text}</span></div>}
              {b.type === 'terminal' && <div className="bg-[#0f1115] p-4 font-mono text-sm text-emerald-400 rounded-lg shadow-inner">{b.content}</div>}
              {b.type === 'progress' && <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden shadow-inner"><div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${b.percent}%` }}></div></div>}
              {b.type === 'counter' && <div className="bg-neutral-900 p-6 rounded-xl text-center border border-neutral-800 shadow-xl"><div className="text-5xl font-black" style={{ color: b.styles.color }}>{b.text}</div><div className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase mt-1">{b.title}</div></div>}
            </div>
          )
        })}
      </div>
    </div>
  );
}