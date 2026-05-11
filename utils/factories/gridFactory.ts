import { FactoryContext } from '../blockFactory';

export const buildGrid = (block: any, variant: string, ctx: FactoryContext) => {
  if (variant === 'gallery-grid') { 
    block.styles.gridTemplateColumns = 'repeat(3, 1fr)'; block.styles.gap = '20px'; 
    block.children = [ctx.createBlock('img', 'rounded', 'Foto 1'), ctx.createBlock('img', 'rounded', 'Foto 2'), ctx.createBlock('img', 'rounded', 'Foto 3')]; 
  }
  else if (variant === 'grid-2') {
    block.name = 'SIATKA 2-KOL'; block.styles.gridTemplateColumns = 'repeat(2, 1fr)'; block.styles.gap = '24px';
    block.children = [ctx.createBlock('container', 'empty', 'Kolumna 1'), ctx.createBlock('container', 'empty', 'Kolumna 2')];
  }
  else if (variant === 'grid-3') {
    block.name = 'SIATKA 3-KOL'; block.styles.gridTemplateColumns = 'repeat(3, 1fr)'; block.styles.gap = '24px';
    block.children = [ctx.createBlock('container', 'empty', 'Kolumna 1'), ctx.createBlock('container', 'empty', 'Kolumna 2'), ctx.createBlock('container', 'empty', 'Kolumna 3')];
  }
  else if (variant === 'bento') {
    block.name = 'BENTO GRID'; block.styles.gridTemplateColumns = 'repeat(4, 1fr)'; block.styles.gap = '16px';
    
    const box1 = ctx.createBlock('container', 'shadow-pro', 'Main Bento'); box1.styles.gridColumn = 'span 2'; box1.styles.gridRow = 'span 2';
    const box2 = ctx.createBlock('container', 'shadow-pro', 'Side Bento Top'); box2.styles.gridColumn = 'span 2'; box2.styles.gridRow = 'span 1';
    const box3 = ctx.createBlock('container', 'shadow-pro', 'Side Bento Bottom 1'); box3.styles.gridColumn = 'span 1'; box3.styles.gridRow = 'span 1';
    const box4 = ctx.createBlock('container', 'shadow-pro', 'Side Bento Bottom 2'); box4.styles.gridColumn = 'span 1'; box4.styles.gridRow = 'span 1';

    block.children = [box1, box2, box3, box4];
  }

  return block;
};