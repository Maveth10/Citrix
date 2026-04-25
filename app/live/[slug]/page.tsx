'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';

export default function LivePage({ params }: { params: { slug: string } }) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      const { data } = await supabase.from('pages').select('content').eq('slug', params.slug).single();
      if (data) setBlocks(data.content);
      setLoading(false);
    };
    fetchPage();
  }, [params.slug]);

  // NOWY RENDERER V5 DLA KLIENTA
  const renderBlock = (b: any) => {
    return (
      <div key={b.id} style={b.styles}>
        {b.type === 'h1' && <h1 style={{fontSize:'inherit', fontWeight:'inherit'}}>{b.text}</h1>}
        {b.type === 'p' && <p>{b.text}</p>}
        {b.type === 'img' && <img src={b.src} alt="Media" className="w-full h-full" style={{objectFit: b.styles.objectFit, borderRadius: b.styles.borderRadius}}/>}
        {b.type === 'button' && <button style={{width:'100%', height:'100%', border:'none', backgroundColor:'transparent', color:'inherit'}}>{b.text}</button>}
        {b.type === 'shape' && <div style={{width:'100%', height:'100%'}}></div>}
        {b.type === 'menu' && <nav style={{width:'100%', height:'100%'}}>{b.text}</nav>}
        {b.type === 'social' && <div style={{width:'100%', height:'100%'}}>{b.text}</div>}
        {b.type === 'faq' && <div className="border border-neutral-300 bg-white p-4 font-bold text-sm">{b.text.split('\n\n')[0]} ▼</div>}
        
        {/* INTERAKTYWNE KOMPONENTY V5 */}
        {b.type === 'slideshow' && b.images && (
          <div className="w-full h-full relative overflow-hidden bg-neutral-100 group">
            <img src={b.images[0]} className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                {b.images.map((_: any, i: number) => <div key={i} className={`w-2 h-2 rounded-full ${i===0?'bg-white':'bg-white/40'}`}></div>)}
            </div>
          </div>
        )}
        
        {/* Renderowanie zagnieżdżeń */}
        {b.children && (
          <div style={{ display: 'inherit', flexDirection: 'inherit', gap: 'inherit', gridTemplateColumns: 'inherit', alignItems: 'inherit', justifyItems: 'inherit', justifyContent: 'inherit', width: '100%', height: '100%' }}>
            {b.children.map((child: any) => renderBlock(child))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <div className="bg-[#111] h-screen w-full flex items-center justify-center text-white font-mono text-xs tracking-widest">Inicjalizacja silnika TITAN V5...</div>;
  if (!blocks || blocks.length === 0) return <div className="bg-[#111] h-screen w-full flex items-center justify-center text-red-500 font-mono">Błąd 404: Strona {params.slug} nie istnieje.</div>;

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center py-10">
      <div className="w-[1200px] bg-white min-h-screen relative shadow-2xl overflow-hidden">
        {blocks.map(b => renderBlock(b))}
      </div>
    </div>
  );
}