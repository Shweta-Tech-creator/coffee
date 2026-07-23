import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Smooth trailing effect
  useEffect(() => {
    let animationFrameId;
    const render = () => {
      setTrailingPos(prev => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18
      }));
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  useEffect(() => {
    const handleElementHover = () => {
      const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovered(true);
          const text = el.getAttribute('data-cursor-text');
          if (text) setCursorText(text);
        });
        el.addEventListener('mouseleave', () => {
          setIsHovered(false);
          setCursorText('');
        });
      });
    };

    handleElementHover();
    const observer = new MutationObserver(handleElementHover);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Main Terracotta Coffee Bean Dot Cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.75 : isHovered ? 1.4 : 1
          })`
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#C86D51"
          className="drop-shadow-[0_0_8px_rgba(200,109,81,0.6)]"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm5.31-3.1L6.1 5.69C7.45 4.63 9.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z" />
        </svg>
      </div>

      {/* Trailing Soft Halo Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-300 flex items-center justify-center"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%)`,
          width: isHovered ? '56px' : '36px',
          height: isHovered ? '56px' : '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(200, 109, 81, 0.45)',
          backgroundColor: isHovered ? 'rgba(200, 109, 81, 0.12)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(200, 109, 81, 0.3)' : 'none',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease'
        }}
      >
        {cursorText && (
          <span className="text-[9px] uppercase tracking-wider text-[#C86D51] font-semibold whitespace-nowrap px-1">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
