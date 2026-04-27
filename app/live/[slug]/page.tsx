import { notFound } from 'next/navigation';
import { supabase } from '../../../supabase'; // Upewnij się, że ścieżka do Twojego supabase.ts jest poprawna

// Komponent renderujący pojedynczy blok (Czysty, bez edytora)
const LiveBlock = ({ b }: { b: any }) => {
  const hasMediaBg = b.styles.bgType === 'image' || b.styles.bgType === 'video';
  const bgStyles = { ...b.styles };
  
  if (b.styles.bgType === 'image') {
    bgStyles.backgroundImage = b.styles.bgImage?.includes('gradient') ? b.styles.bgImage : `url(${b.styles.bgImage})`;
  }
  if (hasMediaBg) bgStyles.backgroundColor = 'transparent';
  
  const containerStyles: any = { 
    ...bgStyles, 
    filter: `blur(${b.styles.filterBlur || 0}px) brightness(${b.styles.filterBrightness ?? 100}%) contrast(${b.styles.filterContrast ?? 100}%)`, 
    mixBlendMode: b.styles.mixBlendMode || 'normal',
    zIndex: b.styles.zIndex || 1 
  };

  if (b.children) {
    containerStyles.display = 'flex';
    containerStyles.flexDirection = 'column';
  }

  // Animacje i Interakcje
  const hover = b.hoverStyles || {};
  const hasHover = hover.scale || hover.translateY || hover.backgroundColor;
  
  if (b.entranceAnim === 'fade-in') containerStyles.animation = `fadeIn 0.8s ease-out forwards`;
  if (b.entranceAnim === 'slide-up') containerStyles.animation = `slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
  if (b.entranceAnim === 'zoom-in') containerStyles.animation = `zoomIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`;

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) return url.replace('watch?v=', 'embed/').split('&')[0];
    if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/');
    if (url.includes('vimeo.com/')) return url.replace('vimeo.com/', 'player.vimeo.com/video/');
    return url;
  };

  const isTextElement = ['h1', 'h2', 'marquee', 'p', 'list', 'faq', 'button', 'social', 'alert'].includes(b.type);
  let Tag: keyof JSX.IntrinsicElements = 'div';
  if (['h1', 'h2', 'marquee'].includes(b.type)) Tag = 'h1';
  if (b.type === 'p') Tag = 'p';
  if (b.type === 'menu') Tag = 'nav';

  return (
    <>
      {/* Dynamiczne CSS-y generowane na serwerze! */}
      <style dangerouslySetInnerHTML={{__html: `
        #live-${b.id} {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;
        }
        ${hasHover ? `
          #live-${b.id}:hover {
            transform: scale(${hover.scale || 1}) translateY(${hover.translateY || 0}px) !important;
            ${hover.backgroundColor ? `background-color: ${hover.backgroundColor} !important;` : ''}
            z-index: 50 !important;
          }
        ` : ''}
      `}} />

      <div id={`live-${b.id}`} style={containerStyles} className="relative">
        
        {/* Tła multimedialne */}
        {b.styles.bgType === 'video' && b.styles.bgVideo && <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ zIndex: 0 }} src={b.styles.bgVideo} />}
        {hasMediaBg && b.styles.bgOverlay && <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: b.styles.bgOverlay, zIndex: 1 }}></div>}
        
        {/* Pasek Marquee / Ribbon */}
        {b.type === 'ribbon' && b.ribbonItems && (
          <div style={{ overflow: 'hidden', width: '100%', display: 'flex', whiteSpace: 'nowrap', alignItems: 'center', height: '100%', zIndex: 10, position: 'relative' }}>
             {[1, 2].map(group => (
               <div key={group} style={{ display: 'flex', flexShrink: 0, minWidth: '100%', justifyContent: 'space-around', animation: 'scroll-marquee 15s linear infinite' }}>
                 {b.ribbonItems!.map((item: any, i: number) => (
                   <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 30px' }}>
                     {item.type === 'img' ? <img src={item.value} style={{ height: '1.2em', objectFit: 'contain' }} alt="ribbon-icon" /> : <span style={{fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit'}} dangerouslySetInnerHTML={{ __html: item.value }}/>}
                   </div>
                 ))}
               </div>
             ))}
          </div>
        )}

        {/* Teksty */}
        {isTextElement && (
          <Tag 
            style={{ fontSize:'inherit', fontWeight:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0, overflow:'hidden', wordBreak:'break-word', outline: 'none', textShadow: b.styles.textShadow, width: '100%', height: '100%', display: Tag === 'div' ? 'flex' : 'block', alignItems: b.styles.alignItems, justifyContent: b.styles.justifyContent, zIndex: 10, position: 'relative' }}
            dangerouslySetInnerHTML={{ __html: b.text || '' }}
          />
        )}
        
        {/* Wideo (Bez szklanej tarczy - można klikać!) */}
        {b.type === 'video' && (
          <div className="w-full h-full relative z-10 overflow-hidden" style={{ borderRadius: b.styles.borderRadius }}>
            {b.src && (b.src.includes('youtube') || b.src.includes('youtu.be') || b.src.includes('vimeo')) ? (
              <iframe className="w-full h-full" src={getEmbedUrl(b.src)} frameBorder="0" allowFullScreen></iframe>
            ) : (
              <video className="w-full h-full object-cover" controls src={b.src} />
            )}
          </div>
        )}

        {/* Embedy (Z włączonymi pointer-events, żeby działały na żywo) */}
        {b.type === 'embed' && (
          <div className="w-full h-full relative z-10 flex items-center justify-center overflow-hidden" style={{ borderRadius: b.styles.borderRadius }}>
             <style dangerouslySetInnerHTML={{__html: `#live-${b.id} iframe { width: 100%; height: 100%; border: none; }`}} />
             <div dangerouslySetInnerHTML={{ __html: b.text || '' }} className="w-full h-full" />
          </div>
        )}
        
        {/* Obrazy */}
        {b.type === 'img' && (
          <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius: b.styles.borderRadius, position: 'relative', zIndex: 10}}>
            <img src={b.src} className="w-full h-full transition-all duration-500" style={{objectFit: b.styles.objectFit, objectPosition: `${b.styles.objectPositionX || 50}% ${b.styles.objectPositionY || 50}%`, transform: `scale(${b.styles.imageScale || 1})`}} alt="live-image" />
          </div>
        )}
        
        {/* Rekursywne dzieci */}
        {b.children && (
          <div className="w-full h-full relative flex-1 z-10" style={{ display: b.styles.display === 'grid' ? 'grid' : 'flex', flexDirection: b.styles.display === 'grid' ? undefined : (b.styles.flexDirection || 'column'), gap: b.styles.gap || '20px', gridTemplateColumns: b.styles.gridTemplateColumns, gridTemplateRows: b.styles.gridTemplateRows, alignItems: b.styles.alignItems, justifyContent: b.styles.justifyContent }}>
             {b.children.map((child: any) => {
                if (b.styles.display === 'grid') child.styles.width = '100%';
                return <LiveBlock key={child.id} b={child} />;
             })}
          </div>
        )}

      </div>
    </>
  );
};

export const revalidate = 0; // Wyłączamy cache, żeby zawsze pobierało najnowszą wersję strony po publikacji

// Główny Serwerowy Komponent Strony
export default async function LivePage({ params }: { params: { slug: string } }) {
  
  // 1. Pobieramy JSON strony bezpośrednio z Supabase
  const { data, error } = await supabase
    .from('pages')
    .select('content')
    .eq('slug', params.slug)
    .single();

  // 2. Jeśli nie ma strony o takim URL, wyrzucamy błąd 404
  if (error || !data) {
    return notFound();
  }

  const blocks = data.content;

  // 3. Renderujemy potężne, czyste drzewo DOM
  return (
    <main className="min-h-screen w-full bg-white text-black overflow-x-hidden font-sans">
      
      {/* Globalne definicje animacji wejściowych */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes scroll-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}} />

      {/* Renderowanie głównych bloków na żywo */}
      {blocks.map((b: any) => (
        <LiveBlock key={b.id} b={b} />
      ))}
      
    </main>
  );
}