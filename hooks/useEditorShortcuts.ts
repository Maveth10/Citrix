import { useEffect } from 'react';

interface UseEditorShortcutsProps {
  isPreviewMode: boolean;
  setIsPreviewMode: (val: boolean) => void;
  isMediaManagerOpen: boolean;
  setIsMediaManagerOpen: (val: boolean) => void;
  isAiOpen: boolean;
  setIsAiOpen: (val: boolean) => void;
  leftTab: string | null;
  setLeftTab: (val: string | null) => void;
  addCategory: string | null;
  setAddCategory: (val: string | null) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  activeId: number | null;
  setActiveId: (val: number | null) => void;
  activeBlock: any;
  updateActiveBlock: (updates: any, skipHistory?: boolean) => void;
  removeActiveBlock: () => void;
  handleDuplicate: () => void;
  undo: () => void;
  redo: () => void;
}

export const useEditorShortcuts = ({
  isPreviewMode, setIsPreviewMode,
  isMediaManagerOpen, setIsMediaManagerOpen,
  isAiOpen, setIsAiOpen,
  leftTab, setLeftTab,
  addCategory, setAddCategory,
  isEditing, setIsEditing,
  activeId, setActiveId,
  activeBlock, updateActiveBlock,
  removeActiveBlock, handleDuplicate,
  undo, redo
}: UseEditorShortcutsProps) => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const inInput = activeTag === 'input' || activeTag === 'textarea';

      if (e.key === 'Escape') {
        if (isPreviewMode) { setIsPreviewMode(false); return; } 
        if (isMediaManagerOpen) { setIsMediaManagerOpen(false); return; }
        if (isAiOpen) { setIsAiOpen(false); return; }
        if (leftTab || addCategory) { setLeftTab(null); setAddCategory(null); return; }
        if (isEditing) { setIsEditing(false); return; }
        if (activeId) { setActiveId(null); return; }
      }
      
      if (!isEditing && !inInput && !isPreviewMode) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          e.preventDefault();
          if (activeId) removeActiveBlock();
        }
        
        if (e.key === ']') {
          e.preventDefault();
          if (activeId && activeBlock) {
             const z = activeBlock.styles?.zIndex || 1;
             updateActiveBlock({ styles: { zIndex: z + 1 } }, true);
          }
        }
        if (e.key === '[') {
          e.preventDefault();
          if (activeId && activeBlock) {
             const z = activeBlock.styles?.zIndex || 1;
             updateActiveBlock({ styles: { zIndex: Math.max(0, z - 1) } }, true);
          }
        }
        
        if (e.ctrlKey || e.metaKey) {
          if (e.key === 'd' || e.key === 'D') {
            e.preventDefault();
            if (activeId) handleDuplicate();
          }
          if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
          if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) { e.preventDefault(); redo(); }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isPreviewMode, isMediaManagerOpen, isAiOpen, leftTab, addCategory, 
    isEditing, activeId, activeBlock, updateActiveBlock, removeActiveBlock, 
    handleDuplicate, undo, redo, setIsPreviewMode, setIsMediaManagerOpen, 
    setIsAiOpen, setLeftTab, setAddCategory, setIsEditing, setActiveId
  ]);
};