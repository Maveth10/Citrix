'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';

export default function LivePage({ params }: { params: { slug: string } }) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselStates, setCarouselStates] = useState<{[key: number]: number}>({});

  useEffect(() => {
    const fetchPage = async () => {
      const { data } = await supabase.from('pages').select('content').eq('slug', params.slug).single();
      if (data) setBlocks(data.content);
      setLoading(false);
    };
    fetchPage();
  }, [params.slug]);

  const nextSlide = (blockId: number, max: number) => setCarouselStates(prev => ({ ...prev, [blockId]: ((prev[blockId] || 0) + 1) % max }));
  const prevSlide = (blockId: number, max: number) => setCarouselStates(prev => ({ ...prev, [blockId]: ((prev[blockId] || 0) - 1 + max) % max }));

  const renderBlock = (b: any) => {
    const content = (
      <>
        {/* TEKST */}
        {(b.type === 'h1' || b.type === 'h2') && <h1 style={{fontSize:'inherit', fontWeight:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0}}>{b.text}</h1>}
        {b.type === 'p' && <p style={{fontSize:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0}}>{b.text}</p>}
        {b.type === 'list' && <div style={{fontSize:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', whiteSpace:'pre-wrap'}}>{b.text}</div>}
        
        {/* MEDIA */}
        {b.type === 'img' && <img src={b.src} alt="Media" style={{width:'100%', height:'100%', objectFit: b.styles.objectFit, borderRadius: b.styles.borderRadius}}/>}
        {b.type === 'video' && <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${b.videoId}`} frameBorder="0" style={{borderRadius: b.styles.borderRadius}}></iframe>}
        {b.type === 'embed' && <iframe src={b.src} style={{width:'100%', height:'100%', border:0, borderRadius: b.styles.borderRadius}} allowFullScreen loading="lazy"></iframe>}
        
        {/* INNE */}
        {b.type === 'button' && <button style={{width:'100%', height:'100%', border:'none', backgroundColor: b.styles.backgroundColor, color: b.styles.color, borderRadius: b.styles.borderRadius, fontSize: b.styles.fontSize, fontWeight: b.styles.fontWeight, cursor:'pointer'}}>{b.text}</button>}
        {b.type === 'shape' && <div style={{width:'100%', height:'100%'}}></div>}
        {b.type === 'menu' && <nav style={{width:'100%', height:'100%'}}>{b.text}</nav>}
        {b.type === 'social' && <div style={{width:'100%', height:'100%'}}>{b.text}</div>}
        {b.type === 'app' && <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyItems:'center', fontWeight:'bold'}}>{b.text}</div>}
        
        {/* FORMULARZ */}
        {b.type === 'input' && <input type="text" placeholder={b.text} required style={{width:'100%', height:'100%', border: b.styles.border, backgroundColor: b.styles.backgroundColor, borderRadius: b.styles.borderRadius, padding: b.styles.padding, outline:'none', color:'inherit', fontSize:'inherit'}} />}
        {b.type === 'textarea' && <textarea placeholder={b.text} required style={{width:'100%', height:'100%', border: b.styles.border, backgroundColor: b.styles.backgroundColor, borderRadius: b.styles.borderRadius, padding: b.styles.padding, outline:'none', color:'inherit', fontSize:'inherit', resize:'none'}} />}
        
        {/* KARUZELA */}
        {(b.type === 'carousel' || b.type === 'gallery') && b.images && (
          <div style={{width:'100%', height:'100%', position:'relative', overflow:'hidden', borderRadius: b.styles.borderRadius}} className="group">
            <div style={{display:'flex', width:'100%', height:'100%', transition:'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)', transform:`translateX(-${(carouselStates[b.id] || 0) * 100}%)`}}>
              {b.images.map((img: string, i: number) => <img key={i} src={img} style={{width:'100%', height:'100%', objectFit:'cover', flexShrink:0}} alt={`Slide ${i}`}/>)}
            </div>
            <button type="button" onClick={(e) => { e.preventDefault(); prevSlide(b.id, b.images.length); }} style={{position:'absolute', left:'16px', top:'50%', transform:'translateY(-50%)', zIndex:10}} className="bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow text-xl">❮</button>
            <button type="button" onClick={(e) => { e.preventDefault(); nextSlide(b.id, b.images.length); }} style={{position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)', zIndex:10}} className="bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow text-xl">❯</button>
          </div>
        )}
        
        {b.children && (
          <div style={{ display: 'inherit', flexDirection: 'inherit', gap: 'inherit', gridTemplateColumns: 'inherit', alignItems: 'inherit', justifyItems: 'inherit', justifyContent: 'inherit', width: '100%', height: '100%' }}>
            {b.children.map((child: any) => renderBlock(child))}
          </div>
        )}
      </>
    );

    return <div key={b.id} style={b.styles}>{content}</div>;
  };

  if (loading) return <div className="bg-[#111] h-screen w-full flex items-center justify-center text-white font-mono text-xs tracking-widest">Inicjalizacja środowiska TITAN...</div>;
  if (!blocks || blocks.length === 0) return <div className="bg-[#111] h-screen w-full flex items-center justify-center text-red-500 font-mono">Błąd 404: Strona nie istnieje.</div>;

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center overflow-x-hidden">
      <div className="w-[1200px] bg-white min-h-screen relative shadow-2xl">
        {blocks.map(b => renderBlock(b))}
      </div>
    </div>
  );
}