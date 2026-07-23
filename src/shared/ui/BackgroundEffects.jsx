import React, { useEffect, useRef } from 'react';

export const BackgroundEffects = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];

    // Organic Aroma Steam Particles (25 items)
    for (let i = 0; i < 25; i++) {
      particles.push({
        type: 'steam',
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 35 + 20,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.2,
        opacity: Math.random() * 0.12 + 0.03,
        growSpeed: Math.random() * 0.06 + 0.02
      });
    }

    // Golden Ambient Dust Particles (40 items)
    for (let i = 0; i < 40; i++) {
      particles.push({
        type: 'dust',
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.4 + 0.15
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (p.type === 'steam') {
          // Natural physics rising with light turbulence
          p.x += p.vx + Math.sin(p.y * 0.005) * 0.3;
          p.y += p.vy;
          p.radius += p.growSpeed;
          p.opacity -= 0.0004;

          // Gentle mouse reaction
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            p.x += (dx / dist) * 0.8;
          }

          if (p.opacity <= 0 || p.y < -60) {
            p.y = height + 40;
            p.x = Math.random() * width;
            p.radius = Math.random() * 30 + 15;
            p.opacity = Math.random() * 0.12 + 0.03;
          }

          ctx.save();
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          gradient.addColorStop(0, `rgba(201, 169, 110, ${p.opacity})`);
          gradient.addColorStop(0.5, `rgba(140, 112, 64, ${p.opacity * 0.4})`);
          gradient.addColorStop(1, 'rgba(8, 6, 10, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (p.type === 'dust') {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = '#C9A96E';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Subtle Ambient Gold Glowing Orbs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#C9A96E]/5 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-10 w-[550px] h-[550px] bg-[#8C7040]/5 rounded-full blur-[180px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2.5s' }} />

      <canvas ref={canvasRef} className="w-full h-full block opacity-70" />
    </div>
  );
};
