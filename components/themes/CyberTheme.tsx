import React from 'react';

export default function CyberTheme() {
  return (
    <style dangerouslySetInnerHTML={{__html: `
      /* Strefy zrzutu (Drag & Drop) */
      .dropzone-active { 
        background-color: rgba(255, 69, 0, 0.3) !important; 
        transform: scale(1.02) !important; 
        border-color: rgba(255, 69, 0, 1) !important; 
      }
      
      /* Kosmiczne Suwaki i Scrollbary */
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
      * { scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.1) transparent; }
      
      /* Animacje UI */
      @keyframes neon-breathe { 
        0%, 100% { box-shadow: 0 0 10px -2px var(--theme-color), inset 0 0 5px -2px var(--theme-color); } 
        50% { box-shadow: 0 0 20px 2px var(--theme-color), inset 0 0 10px 1px var(--theme-color); } 
      }
      
      /* Panele Glassmorphism */
      .cyber-glass-panel { 
        background: rgba(8, 8, 12, 0.75) !important; 
        backdrop-filter: blur(30px) saturate(150%) !important; 
        -webkit-backdrop-filter: blur(30px) saturate(150%) !important; 
        border-right: 1px solid rgba(255, 255, 255, 0.05); 
        box-shadow: 10px 0 30px rgba(0,0,0,0.5) !important; 
      }
      
      /* Kafelki w menu bocznym */
      .cyber-kafel { 
        background: rgba(255, 255, 255, 0.015); 
        border: 1px solid rgba(255, 255, 255, 0.04); 
        backdrop-filter: blur(12px); 
        border-radius: 14px; color: #94a3b8; 
        transition: all 0.3s ease; 
      }
      .cyber-kafel:hover { 
        background: rgba(255, 255, 255, 0.04); 
        border-color: rgba(255, 255, 255, 0.08); 
        color: #fff; 
      }
      .cyber-kafel.active { 
        background: rgba(255, 255, 255, 0.07); 
        border-color: var(--theme-color); 
        animation: neon-breathe 8s infinite ease-in-out; 
        color: #fff; 
      }
    `}} />
  );
}