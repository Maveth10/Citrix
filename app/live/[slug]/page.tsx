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

  // REKURENCYJNY RENDERER DLA KLIENTA
  const renderBlock = (b: any) => {
    const isAbs = b.layering.position === 'absolute';
    const style = { 
      ...b.styles, 
      position: b.layering.position, 
      top: isAbs ? `${b.layering.top}px` : undefined, 
      left: isAbs ? `${b.layering.left}px` : undefined, 
      zIndex: b.layering.zIndex 
    };

    return (
      <div key={b.id} style={style}>
        {b.type === 'h1' && <h1 style={{fontSize: b.styles.fontSize, fontWeight: b.styles.fontWeight}}>{b.text}</h1>}
        {b.type === 'p' && <p>{b.text}</p>}
        {(b.type === 'section' || b.type === 'container') && (
          <div className="w-full h-full relative">
             {b.children?.map((child: any) => renderBlock(child))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <div className="bg-black h-screen text-white flex items-center justify-center">V2 LOADING...</div>;

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center py-10">
      <div className="w-[1200px] bg-white shadow-2xl relative">
        {blocks.map(b => renderBlock(b))}
      </div>
    </div>
  );
}