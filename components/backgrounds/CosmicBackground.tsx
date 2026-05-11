'use client';

import React, { useState, useEffect } from 'react';

interface AuroraOrb { id: number; x: number; y: number; tx: number; ty: number; size: number; blur: number; hue: number; duration: number; opacity: number; }
interface ShootingStar { id: number; startX: number; startY: number; length: number; speed: number; angle: number; }
interface BlackHole { active: boolean; x: number; y: number; }

export default function CosmicBackground() {
  const [auroraOrbs, setAuroraOrbs] = useState<AuroraOrb[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [blackHole, setBlackHole] = useState<BlackHole | null>(null);

  useEffect(() => {
    let frameId: number;
    const updateDynamicColor = () => {
      const time = Date.now();
      const hue = (time / 300) % 360; 
      document.documentElement.style.setProperty('--theme-color', `hsl(${hue}, 100%, 55%)`);
      frameId = requestAnimationFrame(updateDynamicColor);
    };
    frameId = requestAnimationFrame(updateDynamicColor);

    const spawnOrb = () => {
      const newOrb: AuroraOrb = {
        id: Date.now() + Math.random(),
        x: Math.random() * 140 - 20, y: Math.random() * 140 - 20, 
        tx: (Math.random() - 0.5) * 80, ty: (Math.random() - 0.5) * 80, 
        size: Math.random() * 800 + 500, blur: Math.random() * 40 + 80,  
        hue: Math.random() * 140 + 150, duration: Math.random() * 20 + 20, opacity: Math.random() * 0.25 + 0.15, 
      };
      setAuroraOrbs(prev => [...prev, newOrb]);
      setTimeout(() => {
        setAuroraOrbs(prev => prev.filter(orb => orb.id !== newOrb.id));
      }, newOrb.duration * 1000);
    };

    const spawnShootingStar = () => {
      const newStar: ShootingStar = {
        id: Date.now() + Math.random(),
        startX: Math.random() * 100, startY: Math.random() * 50 - 20,  
        length: Math.random() * 200 + 100, speed: Math.random() * 1.5 + 0.5, angle: Math.random() * 60 + 20,   
      };
      setShootingStars(prev => [...prev, newStar]);
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newStar.id));
      }, newStar.speed * 1000 + 100);
    };

    // Initial spawn
    for (let i = 0; i < 8; i++) spawnOrb();
    
    const spawnAuroraInterval = setInterval(spawnOrb, 4000); 
    const spawnStarInterval = setInterval(() => { if (Math.random() > 0.5) spawnShootingStar(); }, 5000); 

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(spawnAuroraInterval);
      clearInterval(spawnStarInterval);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes full-spectrum-shift { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
        @keyframes aurora-flow { 0% { opacity: 0; transform: translate(0, 0) scale(0.8); } 25% { opacity: var(--max-opacity, 0.35); transform: translate(calc(var(--tx) * 0.33), calc(var(--ty) * 0.33)) scale(1.1); } 75% { opacity: var(--max-opacity, 0.35); transform: translate(calc(var(--tx) * 0.66), calc(var(--ty) * 0.66)) scale(1.2); } 100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0.9); } }
        @keyframes shooting-star-dash { 0% { opacity: 0; transform: rotate(var(--star-angle)) translateX(0) scaleX(1); } 5% { opacity: 1; transform: rotate(var(--star-angle)) translateX(100%) scaleX(1.3); } 90% { opacity: 1; transform: rotate(var(--star-angle)) translateX(2000%) scaleX(1.5); } 100% { opacity: 0; transform: rotate(var(--star-angle)) translateX(2500%) scaleX(0.8); } }
        .aurora-container-normal { opacity: 0.9; transform: scale(1); transition: opacity 4s ease, transform 6s ease; }
        .aurora-flowing-orb { position: absolute; border-radius: 50%; filter: blur(150px); pointer-events: none; mix-blend-mode: plus-lighter; animation-name: aurora-flow; animation-timing-function: ease-in-out; animation-fill-mode: forwards; opacity: 0; }
        .shooting-star { position: absolute; height: 1.5px; background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 1) 30%, var(--theme-color) 80%, rgba(0, 229, 255, 0) 100%); pointer-events: none; mix-blend-mode: screen; filter: drop-shadow(0 0 4px var(--theme-color)); animation-name: shooting-star-dash; animation-timing-function: linear; animation-fill-mode: forwards; transform-origin: left center; }
      `}} />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#070709]"></div>

      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden animate-[full-spectrum-shift_60s_linear_infinite] aurora-container-normal">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>

        {auroraOrbs.map(orb => (
          <div key={orb.id} className="aurora-flowing-orb" style={{ width: `${orb.size}px`, height: `${orb.size}px`, left: `${orb.x}%`, top: `${orb.y}%`, backgroundColor: `hsl(${orb.hue}, 100%, 55%)`, filter: `blur(${orb.blur}px)`, animationDuration: `${orb.duration}s`, '--tx': `${orb.tx}vw`, '--ty': `${orb.ty}vh`, '--max-opacity': orb.opacity } as React.CSSProperties} />
        ))}

        {shootingStars.map(star => (
          <div key={star.id} className="shooting-star" style={{ width: `${star.length}px`, left: `${star.startX}%`, top: `${star.startY}%`, animationDuration: `${star.speed}s`, '--star-angle': `${star.angle}deg` } as React.CSSProperties} />
        ))}
      </div>
    </>
  );
}