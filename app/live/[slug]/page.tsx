'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';

export default function LivePage({ params }: { params: { slug: string } }) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Stany dla interaktywnych bloków (Karuzela)
  const [carouselStates, setCarouselStates] = useState<{[key: number]: number}>({});
  const [formStatus, setFormStatus] = useState<{[key: number]: string}>({});

  useEffect(() => {
    const fetchPage = async () => {
      const { data } = await supabase.from('pages').select('content').eq('slug', params.slug).single();
      if (data) setBlocks(data.content);
      setLoading(false);
    };
    fetchPage();
  }, [params.slug]);

  // LOGIKA FORMULARZA -> SUPABASE
  const handleFormSubmit = async (e: React.FormEvent, formBlockId: number) => {
    e.preventDefault();
    setFormStatus(prev => ({...prev, [formBlockId]: 'Wysyłanie...'}));
    
    // Zbieramy dane ze wszystkich inputów wewnątrz tego formularza
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const { error } = await supabase.from('leads').insert([{ page_slug: params.slug, data }]);
    
    if (error) {
      setFormStatus(prev => ({...prev, [formBlockId]: 'Błąd: ' + error.message}));
    } else {
      setFormStatus(prev => ({...prev, [formBlockId]: 'Sukces! Wysłano.'}));
      (e.target as HTMLFormElement).reset();
    }
  };

  const nextSlide = (blockId: number, max: number) => {
    setCarouselStates(prev => ({ ...prev, [blockId]: ((prev[blockId] || 0) + 1) % max }));
  };
  const prevSlide = (blockId: number, max: number) => {
    setCarouselStates(prev => ({ ...prev, [blockId]: ((prev[blockId] || 0) - 1 + max) % max }));
  };

  const renderBlock = (b: any) => {
    // Wsparcie dla animacji i styli hover przez dedykowany wrapper
    const animClass = b.entranceAnim && b.entranceAnim !== 'none' ? `animate-in ${b.entranceAnim === 'animate-fade-in' ? 'fade-in duration-1000' : b.entranceAnim === 'animate-slide-up' ? 'slide-in-from-bottom-10 fade-in duration-700' : 'zoom-in-95 fade-in duration-700'}` : '';

    const content = (
      <>
        {b.type === 'h1' && <h1 style={{fontSize:'inherit', fontWeight:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0}}>{b.text}</h1>}
        {b.type === 'p' && <p style={{fontSize:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0}}>{b.text}</p>}
        {b.type === 'img' && <img src={b.src} alt="Media" className="w-full h-full" style={{objectFit: b.styles.objectFit, borderRadius: b.styles.borderRadius}}/>}
        
        {/* Dynamiczny Przycisk ze wsparciem Hover */}
        {b.type === 'button' && (
          <button type="submit" 
            className="transition-all duration-300" 
            style={{width:'100%', height:'100%', border:'none', backgroundColor: b.styles.backgroundColor, color: b.styles.color, borderRadius: b.styles.borderRadius, fontSize: b.styles.fontSize, fontWeight: b.styles.fontWeight, cursor:'pointer'}}
            onMouseEnter={(e) => {
              if (b.hoverStyles?.backgroundColor) e.currentTarget.style.backgroundColor = b.hoverStyles.backgroundColor;
              if (b.hoverStyles?.transform) e.currentTarget.style.transform = b.hoverStyles.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = b.styles.backgroundColor;
              e.currentTarget.style.transform = 'none';
            }}
          >{b.text}</button>
        )}
        
        {/* POLA FORMULARZA */}
        {b.type === 'input' && <input type="text" name={b.name || `field_${b.id}`} placeholder={b.text} required style={{width:'100%', height:'100%', border: b.styles.border, backgroundColor: b.styles.backgroundColor, borderRadius: b.styles.borderRadius, padding: b.styles.padding, outline:'none', color:'inherit', fontSize:'inherit'}} />}
        {b.type === 'textarea' && <textarea name={b.name || `field_${b.id}`} placeholder={b.text} required style={{width:'100%', height:'100%', border: b.styles.border, backgroundColor: b.styles.backgroundColor, borderRadius: b.styles.borderRadius, padding: b.styles.padding, outline:'none', color:'inherit', fontSize:'inherit', resize:'none'}} />}
        
        {/* NATIVE KARUZELA */}
        {b.type === 'carousel' && b.images && (
          <div className="w-full h-full relative overflow-hidden group rounded-xl">
            <div className="flex transition-transform duration-500 w-full h-full" style={{ transform: `translateX(-${(carouselStates[b.id] || 0) * 100}%)` }}>
              {b.images.map((img: string, i: number) => <img key={i} src={img} className="w-full h-full object-cover shrink-0" alt={`Slide ${i}`}/>)}
            </div>
            <button type="button" onClick={(e) => { e.preventDefault(); prevSlide(b.id, b.images.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-black w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow">❮</button>
            <button type="button" onClick={(e) => { e.preventDefault(); nextSlide(b.id, b.images.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-black w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow">❯</button>
          </div>
        )}
        
        {/* Renderowanie zagnieżdżeń */}
        {b.children && (
          <div style={{ display: 'inherit', flexDirection: 'inherit', gap: 'inherit', gridTemplateColumns: 'inherit', alignItems: 'inherit', justifyItems: 'inherit', justifyContent: 'inherit', width: '100%', height: '100%' }}>
            {b.children.map((child: any) => renderBlock(child))}
          </div>
        )}

        {/* Status Formularza */}
        {b.type === 'form' && formStatus[b.id] && (
           <div className={`mt-4 p-3 rounded text-sm font-bold text-center ${formStatus[b.id].includes('Sukces') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{formStatus[b.id]}</div>
        )}
      </>
    );

    // Jesli element jest formularzem, zawijamy go w tag <form>
    if (b.type === 'form') {
      return (
        <form key={b.id} style={b.styles} className={animClass} onSubmit={(e) => handleFormSubmit(e, b.id)}>
          {content}
        </form>
      );
    }

    return <div key={b.id} style={b.styles} className={animClass}>{content}</div>;
  };

  if (loading) return <div className="bg-[#111] h-screen w-full flex items-center justify-center text-white font-mono text-xs tracking-widest">Wczytywanie logiki V4...</div>;
  if (!blocks || blocks.length === 0) return <div className="bg-[#111] h-screen w-full flex items-center justify-center text-red-500 font-mono">Błąd 404: Strona {params.slug} nie istnieje.</div>;

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="w-[1200px] bg-white min-h-screen relative shadow-2xl overflow-hidden">
        {blocks.map(b => renderBlock(b))}
      </div>
    </div>
  );
}