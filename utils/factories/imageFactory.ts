import { FactoryContext } from '../blockFactory';

export const buildImage = (block: any, variant: string, ctx: FactoryContext) => {
  block.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'; 
  block.styles.width = '100%'; 
  block.styles.height = 'auto'; 
  block.styles.objectFit = 'cover'; 
  block.styles.imageScale = 1; 

  if (variant === 'rounded') { 
    block.styles.borderRadius = '24px'; block.styles.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; 
  } else if (variant === 'avatar') { 
    block.styles.width = '150px'; block.styles.height = '150px'; block.styles.borderRadius = '50%'; block.styles.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'; 
  } else if (variant === 'polaroid') { 
    block.styles.padding = '12px 12px 50px 12px'; block.styles.backgroundColor = '#ffffff'; block.styles.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.2)'; 
  } else if (variant === 'mask-arch') { 
    block.styles.borderRadius = '500px 500px 0 0'; block.styles.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; 
  } else if (variant === 'mask-blob') { 
    block.styles.borderRadius = '40% 60% 70% 30% / 40% 40% 60% 50%'; block.styles.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; 
  }

  return block;
};