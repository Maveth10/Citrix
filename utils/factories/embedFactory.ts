import { FactoryContext } from '../blockFactory';

export const buildEmbed = (block: any, variant: string, ctx: FactoryContext) => {
  block.styles.width = '100%'; 
  block.styles.borderRadius = '12px'; 
  
  if (variant === 'map-classic') {
    block.styles.height = '400px'; 
    block.text = '<iframe src="https://maps.google.com/maps?q=Warszawa&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0; border-radius: 12px;" allowfullscreen="" loading="lazy"></iframe>'; 
  }
  else if (variant === 'map-dark') {
    block.styles.height = '400px'; 
    block.text = '<iframe src="https://maps.google.com/maps?q=Warszawa&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0; border-radius: 12px; filter: invert(90%) hue-rotate(180deg) contrast(80%);" allowfullscreen="" loading="lazy"></iframe>'; 
  }
  else if (variant === 'spotify') {
    block.styles.height = '152px'; 
    block.text = '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>';
  }
  else if (variant === 'soundcloud') {
    block.styles.height = '166px'; 
    block.text = '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>';
  }
  else if (variant === 'iframe') {
    block.styles.height = '300px'; block.styles.border = '2px dashed #cbd5e1'; block.styles.backgroundColor = '#f8fafc'; block.styles.display = 'flex'; block.styles.alignItems = 'center'; block.styles.justifyContent = 'center';
    block.text = '<div style="color:#64748b; font-weight:600;">Skonfiguruj link Iframe w panelu bocznym</div>';
  }
  else if (variant === 'custom-html') {
    block.styles.height = 'auto'; block.styles.padding = '20px'; block.styles.backgroundColor = '#1e293b';
    block.text = '<div style="color:#10b981; font-family:monospace; font-size:14px;"></div>';
  }
  else {
    block.styles.height = '400px'; 
    block.text = '<iframe src="https://maps.google.com/maps?q=Warszawa&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'; 
  }

  return block;
};