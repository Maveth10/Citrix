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

  const renderBlock = (b: any) => {
    return (
      <div key={b.id} style={b.styles}>
        {b.type === 'h1' && <h1 style={{fontSize:'inherit', fontWeight:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0}}>{b.text}</h1>}
        {b.type === 'p' && <p style={{fontSize:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0}}>{b.text}</p>}
        {b.type === 'img' && <img src={b.src} alt="Media" className="w-full h-full" style={{objectFit: b.styles.objectFit, borderRadius: b.styles.borderRadius}}/>}
        {b.type === 'button' && <button style={{width:'100%', height:'100%', border:'none', backgroundColor:'transparent', color:'inherit', fontSize:'inherit', fontWeight:'inherit', cursor:'pointer'}}>{b.text}</button>}
        
        {/* Renderowanie nowych Pól Formularzy */}
        {b.type === 'input' && <input type="text" placeholder={b.text} style={{width:'100%', height:'100%', border:'none', backgroundColor:'transparent', outline:'none', color:'inherit', fontSize:'inherit'}} />}
        {b.type === 'textarea' && <textarea placeholder={b.text} style={{width:'100%', height:'100%', border:'none', backgroundColor:'transparent', outline:'none', color:'inherit', fontSize:'inherit', resize:'none'}} />}
        
        {/* Renderowanie zagnieżdżeń */}
        {b.children && (
          <div style={{ display: 'inherit', flexDirection: 'inherit', gap: 'inherit', gridTemplateColumns: 'inherit', alignItems: 'inherit', justifyItems: 'inherit', justifyContent: 'inherit', width: '100%', height: '100%' }}>
            {b.children.map((child: any) => renderBlock(child))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <div className="bg-[#111] h-screen w-full flex items-center justify-center text-white font-mono text-xs tracking-widest">Wczytywanie architektury V3...</div>;
  if (!blocks || blocks.length === 0) return <div className="bg-[#111] h-screen w-full flex items-center justify-center text-red-500 font-mono">Błąd 404: Strona {params.slug} nie istnieje.</div>;

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="w-[1200px] bg-white min-h-screen relative shadow-2xl">
        {blocks.map(b => renderBlock(b))}
      </div>
    </div>
  );
}