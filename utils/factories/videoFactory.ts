import { FactoryContext } from '../blockFactory';

export const buildVideo = (block: any, variant: string, ctx: FactoryContext) => {
  block.src = 'https://www.w3schools.com/html/mov_bbb.mp4'; 
  block.styles.width = '100%'; 
  block.styles.height = '400px'; 
  block.styles.borderRadius = '12px'; 
  block.styles.backgroundColor = '#000'; 
  block.styles.overflow = 'hidden'; 
  
  if (variant === 'youtube') { 
    block.src = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; 
  } else if (variant === 'vimeo') { 
    block.src = 'https://vimeo.com/76979871'; 
  } else if (variant === 'vertical') {
    block.src = 'https://www.w3schools.com/html/mov_bbb.mp4'; 
    block.styles.width = '320px'; 
    block.styles.height = '568px'; 
    block.styles.margin = '0 auto';
    block.styles.borderRadius = '24px';
    block.styles.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.2)';
  }

  return block;
};