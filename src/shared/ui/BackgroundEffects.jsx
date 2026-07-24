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

    // Organic Aroma Steam Particles — lighter for cream background (15 items)
    for (let i = 0; i < 15; i++) {
      particles.push({
        type: 'steam',
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 30 + 15,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.07 + 0.02,
        growSpeed: Math.random() * 0.05 + 0.02
      });
    }

    // Warm Amber Dust Particles (30 items)
    for (let i = 0; i < 30; i++) {
      particles.push({
        type: 'dust',
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.25 + 0.08
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (p.type === 'steam') {
          p.x += p.vx + Math.sin(p.y * 0.005) * 0.3;
          p.y += p.vy;
          p.radius += p.growSpeed;
          p.opacity -= 0.0003;

          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            p.x += (dx / dist) * 0.8;
          }

          if (p.opacity <= 0 || p.y < -60) {
            p.y = height + 40;
            p.x = Math.random() * width;
            p.radius = Math.random() * 25 + 12;
            p.opacity = Math.random() * 0.07 + 0.02;
          }

          ctx.save();
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          // Warm amber steam on light background
          gradient.addColorStop(0, `rgba(212, 140, 70, ${p.opacity})`);
          gradient.addColorStop(0.5, `rgba(180, 110, 40, ${p.opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(250, 247, 242, 0)');

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
          ctx.globalAlpha = p.opacity * 0.6; // More subtle on light bg
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
      {/* Subtle Warm Amber Glowing Orbs — reduced opacity for light theme */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none" style={{ background: 'rgba(212, 140, 70, 0.06)' }} />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none" style={{ background: 'rgba(224, 138, 62, 0.04)' }} />

      <canvas ref={canvasRef} className="w-full h-full block opacity-50" />
    </div>
  );
};
