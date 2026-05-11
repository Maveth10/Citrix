import React, { useState } from 'react';

export default function DOMNavigator({
  blocks,
  activeId,
  setActiveId,
  setIsEditing,
  hiddenBlocks,
  toggleBlockVisibility,
  moveBlockTree
}: any) {
  // Stany przeciągania na liście warstw (przeniesione z page.tsx!)
  const [draggedTreeId, setDraggedTreeId] = useState<number | null>(null);
  const [treeDropTarget, setTreeDropTarget] = useState<{ id: number, position: 'before' | 'after' | 'inside' } | null>(null);

  const renderLayerTree = (arr: any[], depth = 0) => {
    return arr.map(b => {
      const isDragged = draggedTreeId === b.id;
      const isDropTarget = treeDropTarget?.id === b.id;
      const dropPos = treeDropTarget?.position;

      return (
        <div key={`tree-${b.id}`} className="flex flex-col w-full">
          {isDropTarget && dropPos === 'before' && <div className="h-0.5 bg-[#ff4500] w-full shadow-[0_0_8px_#ff4500]" />}
          <div 
            draggable
            onDragStart={(e) => {
               e.stopPropagation();
               setDraggedTreeId(b.id);
               setActiveId(b.id);
               setIsEditing(false);
            }}
            onDragOver={(e) => {
               e.preventDefault();
               e.stopPropagation();
               if (draggedTreeId === b.id) return;
               const rect = e.currentTarget.getBoundingClientRect();
               const y = e.clientY - rect.top;
               let position: 'before' | 'after' | 'inside' = 'inside';
               
               const canHaveChildren = b.children !== undefined;

               if (y < rect.height * 0.3) position = 'before';
               else if (y > rect.height * 0.7) position = 'after';
               else position = canHaveChildren ? 'inside' : 'after';

               setTreeDropTarget(prev => prev?.id === b.id && prev?.position === position ? prev : { id: b.id, position });
            }}
            onDragLeave={() => {}}
            onDrop={(e) => {
               e.preventDefault();
               e.stopPropagation();
               if (draggedTreeId && treeDropTarget) {
                  moveBlockTree(draggedTreeId, treeDropTarget.id, treeDropTarget.position);
               }
               setDraggedTreeId(null);
               setTreeDropTarget(null);
            }}
            onDragEnd={() => {
               setDraggedTreeId(null);
               setTreeDropTarget(null);
            }}
            className={`flex items-center justify-between pr-2 transition-all cursor-grab active:cursor-grabbing ${isDragged ? 'opacity-30 scale-95' : 'opacity-100'} ${isDropTarget && dropPos === 'inside' ? 'bg-[#ff4500]/20 border-l-2 border-[#ff4500]' : (activeId === b.id ? 'bg-[#ff4500]/20 border-l-2 border-[#ff4500]' : 'hover:bg-white/10 border-l-2 border-transparent')}`}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveId(b.id); setIsEditing(false); }} 
              className={`flex-1 text-left text-[11px] py-2 px-2 truncate flex items-center gap-2 ${activeId === b.id ? 'text-[#ff4500] font-bold drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]' : 'text-neutral-400 hover:text-white'}`} 
              style={{ paddingLeft: `${(depth * 12) + 8}px` }}
            >
              <span className={`flex items-center gap-1.5 ${hiddenBlocks.includes(b.id) ? 'opacity-30 line-through' : ''}`}>
                {b.children ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                )} 
                {b.name}
              </span>
            </button>
            <button onClick={(e) => toggleBlockVisibility(e, b.id)} className={`text-xs px-1 z-10 ${hiddenBlocks.includes(b.id) ? 'text-red-500 hover:text-red-400' : 'text-neutral-500 hover:text-white'}`}>
              {hiddenBlocks.includes(b.id) ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
          {isDropTarget && dropPos === 'after' && <div className="h-0.5 bg-[#ff4500] w-full shadow-[0_0_8px_#ff4500]" />}
          {b.children && renderLayerTree(b.children, depth + 1)}
        </div>
      );
    });
  };

  if (!blocks || blocks.length === 0) {
    return <div className="p-4 text-xs text-neutral-500 text-center">Płótno jest puste.</div>;
  }

  return (
    <div className="w-full flex flex-col pb-10">
      {renderLayerTree(blocks)}
    </div>
  );
}