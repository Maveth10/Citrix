'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';

export default function LivePage({ params }: { params: { slug: string } }) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

  const handleFormSubmit = async (e: React.FormEvent, formBlockId: number) => {
    e.preventDefault();
    setFormStatus(prev => ({...prev, [formBlockId]: 'Wysyłanie...'}));
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const { error } = await supabase.from('leads').insert([{ page_slug: params.slug, data }]);
    if (error) setFormStatus(prev => ({...prev, [formBlockId]: 'Błąd: ' + error.message}));
    else { setFormStatus(prev => ({...prev, [formBlockId]: 'Sukces! Wysłano wiadmość.'})); (e.target as HTMLFormElement).reset(); }
  };

  const nextSlide = (blockId: number, max: number) => setCarouselStates(prev => ({ ...prev, [blockId]: ((prev[blockId] || 0) + 1) % max }));
  const prevSlide = (blockId: number, max: number) => setCarouselStates(prev => ({ ...prev, [blockId]: ((prev[blockId] || 0) - 1 + max) % max }));

  const renderBlock = (b: any) => {
    const hasMediaBg = b.styles.bgType === 'image' || b.styles.bgType === 'video';
    const bgStyles = { ...b.styles };
    if (b.styles.bgType === 'image') bgStyles.backgroundImage = b.styles.bgImage?.includes('gradient') ? b.styles.bgImage : `url(${b.styles.bgImage})`;
    if (hasMediaBg) bgStyles.backgroundColor = 'transparent';
    
    const animClass = b.entranceAnim && b.entranceAnim !== 'none' ? `animate-in ${b.entranceAnim === 'animate-fade-in' ? 'fade-in duration-1000' : b.entranceAnim === 'animate-slide-up' ? 'slide-in-from-bottom-10 fade-in duration-700' : ''}` : '';

    const content = (
      <>
        {b.styles.bgType === 'video' && b.styles.bgVideo && <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ zIndex: 0 }} src={b.styles.bgVideo} />}
        {hasMediaBg && b.styles.bgOverlay && <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: b.styles.bgOverlay, zIndex: 1 }}></div>}

        {/* V11: ENGINE WSTĘGI (SEAMLESS LOOP) */}
        {b.type === 'ribbon' && b.ribbonItems && (
          <div style={{ overflow: 'hidden', width: '100%', display: 'flex', whiteSpace: 'nowrap', alignItems: 'center', height: '100%', zIndex: 10, position: 'relative' }}>
             {[1, 2].map(group => (
               <div key={group} style={{ display: 'flex', flexShrink: 0, minWidth: '100%', justifyContent: 'space-around', animation: 'scroll-marquee 15s linear infinite' }}>
                 {b.ribbonItems!.map((item: any, i: number) => (
                   <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 30px' }}>
                     {item.type === 'img' ? <img src={item.value} style={{ height: '1.2em', objectFit: 'contain' }} className="pointer-events-none" /> : <span style={{fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit'}}>{item.value}</span>}
                   </div>
                 ))}
               </div>
             ))}
          </div>
        )}

        {['h1', 'h2', 'marquee'].includes(b.type) && <h1 style={{fontSize:'inherit', fontWeight:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', letterSpacing:b.styles.letterSpacing, textTransform:b.styles.textTransform, margin:0, zIndex:10, position:'relative'}} dangerouslySetInnerHTML={{__html: b.text}} />}
        {b.type === 'p' && <p style={{fontSize:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', fontStyle:b.styles.fontStyle, margin:0, zIndex:10, position:'relative'}} dangerouslySetInnerHTML={{__html: b.text}} />}
        
        {b.type === 'button' && (
          <button type="submit" 
            style={{width:'100%', height:'100%', border:'none', backgroundColor: b.styles.backgroundColor, color: b.styles.color, borderRadius: b.styles.borderRadius, fontSize: b.styles.fontSize, fontWeight: b.styles.fontWeight, letterSpacing: b.styles.letterSpacing, cursor:'pointer', transition: 'all 0.3s ease', zIndex:10, position:'relative'}}
            onMouseEnter={(e) => { if (b.hoverStyles?.backgroundColor) e.currentTarget.style.backgroundColor = b.hoverStyles.backgroundColor; if (b.hoverStyles?.transform) e.currentTarget.style.transform = b.hoverStyles.transform; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = b.styles.backgroundColor; e.currentTarget.style.transform = 'none'; }}
            dangerouslySetInnerHTML={{__html: b.text}}
          />
        )}
        
        {b.type === 'img' && (
          <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius: b.styles.borderRadius, position: 'relative', zIndex:10}} className="group/img">
            <img src={b.src} className={`w-full h-full pointer-events-none transition-all duration-500 ${b.styles.imgHoverZoom ? 'group-hover/img:scale-110' : ''} ${b.styles.imgGrayscale ? 'grayscale group-hover/img:grayscale-0' : ''}`} style={{objectFit: b.styles.objectFit, objectPosition: `${b.styles.objectPositionX || 50}% ${b.styles.objectPositionY || 50}%`, transform: b.styles.imgHoverZoom ? undefined : `scale(${b.styles.imageScale || 1})`}} />
          </div>
        )}
        
        {b.type === 'input' && <input type="text" name={b.name || `field_${b.id}`} placeholder={b.text} required style={{width:'100%', height:'100%', border: b.styles.border, backgroundColor: b.styles.backgroundColor, borderRadius: b.styles.borderRadius, padding: b.styles.padding, outline:'none', color:'inherit', fontSize:'inherit', zIndex:10, position:'relative'}} />}
        {b.type === 'textarea' && <textarea name={b.name || `field_${b.id}`} placeholder={b.text} required style={{width:'100%', height:'100%', border: b.styles.border, backgroundColor: b.styles.backgroundColor, borderRadius: b.styles.borderRadius, padding: b.styles.padding, outline:'none', color:'inherit', fontSize:'inherit', resize:'none', zIndex:10, position:'relative'}} />}
        
        {['carousel'].includes(b.type) && b.images && (
          <div style={{width:'100%', height:'100%', position:'relative', overflow:'hidden', borderRadius: b.styles.borderRadius, zIndex:10}} className="group">
            <div style={{display:'flex', width:'100%', height:'100%', transition:'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)', transform:`translateX(-${(carouselStates[b.id] || 0) * 100}%)`}}>
              {b.images.map((img: string, i: number) => <img key={i} src={img} style={{width:'100%', height:'100%', objectFit:'cover', flexShrink:0}} alt={`Slide ${i}`}/>)}
            </div>
            <button type="button" onClick={(e) => { e.preventDefault(); prevSlide(b.id, b.images.length); }} style={{position:'absolute', left:'16px', top:'50%', transform:'translateY(-50%)', zIndex:20}} className="bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow">❮</button>
            <button type="button" onClick={(e) => { e.preventDefault(); nextSlide(b.id, b.images.length); }} style={{position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)', zIndex:20}} className="bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow">❯</button>
          </div>
        )}
        
        {b.children && (
          <div style={{ display: 'inherit', flexDirection: 'inherit', gap: 'inherit', gridTemplateColumns: 'inherit', alignItems: 'inherit', justifyItems: 'inherit', justifyContent: 'inherit', width: '100%', height: '100%', zIndex: 10, position: 'relative' }}>
            {b.children.map((child: any) => renderBlock(child))}
          </div>
        )}
        {b.type === 'form' && formStatus[b.id] && <div className={`mt-4 p-3 rounded text-sm font-bold text-center ${formStatus[b.id].includes('Sukces') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} style={{zIndex:10, position:'relative'}}>{formStatus[b.id]}</div>}
      </>
    );

    if (b.type === 'form') return <form key={b.id} style={bgStyles} className={animClass} onSubmit={(e) => handleFormSubmit(e, b.id)}>{content}</form>;
    return <div key={b.id} style={bgStyles} className={animClass}>{content}</div>;
  };

  if (loading) return <div className="bg-[#111] h-screen w-full flex items-center justify-center text-white font-mono text-xs tracking-widest">Wczytywanie V11...</div>;

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      {/* V11: Animacja Marquee dla Live Page */}
      <style dangerouslySetInnerHTML={{__html: `@keyframes scroll-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}} />
      <div className="w-[1200px] bg-white min-h-screen relative shadow-2xl overflow-hidden">
        {blocks.map(b => renderBlock(b))}
      </div>
    </div>
  );
}