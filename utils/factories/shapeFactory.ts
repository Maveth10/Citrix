import { FactoryContext } from '../blockFactory';

export const buildShape = (block: any, variant: string, ctx: FactoryContext) => {
  if (block.type === 'ribbon') { 
    block.styles.width = '100%'; block.styles.backgroundColor = '#facc15'; block.styles.padding = '20px 0'; 
    block.ribbonItems = [{ type: 'text', value: '🔥 WYPRZEDAŻ' }, { type: 'img', value: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' }, { type: 'text', value: 'DARMOWA DOSTAWA' }]; 
  }
  else if (block.type === 'shape') { 
    if(variant === 'box'){
      block.styles.width = '100px'; block.styles.height = '100px'; block.styles.backgroundColor = '#3b82f6';
    } 
    else if(variant === 'circle'){
      block.styles.width = '100px'; block.styles.height = '100px'; block.styles.backgroundColor = '#ec4899'; block.styles.borderRadius = '50%';
    } 
    else if (variant === 'divider') {
      block.styles.width = '100%'; block.styles.height = '1px'; block.styles.backgroundColor = 'transparent'; block.styles.backgroundImage = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'; block.styles.margin = '20px 0';
    }
    else if (variant === 'aurora') {
      block.styles.width = '400px'; block.styles.height = '400px'; block.styles.borderRadius = '50%'; block.styles.backgroundColor = '#9333ea'; block.styles.filterBlur = 100; block.styles.opacity = 0.5; block.styles.position = 'absolute'; block.styles.zIndex = 0; block.styles.pointerEvents = 'none'; 
    }
    else if (variant === 'dots-grid') {
      block.styles.width = '100%'; block.styles.height = '100%'; block.styles.minHeight = '300px'; block.styles.position = 'absolute'; block.styles.top = '0'; block.styles.left = '0'; block.styles.zIndex = 0; block.styles.opacity = 0.3; block.styles.pointerEvents = 'none'; block.styles.backgroundImage = 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)'; block.styles.backgroundSize = '20px 20px';
    }
  }

  return block;
};