import React, { useEffect, useState, useRef } from 'react';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const isTouch = useRef(isTouchDevice());

  useEffect(() => {
    if (isTouch.current) return;

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

  // Trailing smooth ring
  useEffect(() => {
    if (isTouch.current) return;

    let animationFrameId;

    const render = () => {
      setTrailingPos(prev => {
        const nx = prev.x + (position.x - prev.x) * 0.2;
        const ny = prev.y + (position.y - prev.y) * 0.2;
        return { x: nx, y: ny };
      });
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  useEffect(() => {
    if (isTouch.current) return;

    const handleElementHover = () => {
      const hoverables = document.querySelectorAll('a, button, input, select, textarea, [data-cursor-hover]');
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

  if (isTouch.current) return null;

  return (
    <>
      {/* Sleek Amber Coffee Bean Core Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.75 : isHovered ? 1.4 : 1.2
          })`
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="var(--primary)"
          className="drop-shadow-[0_0_12px_rgba(212,140,70,0.7)]"
        >
          {/* Aesthetic Coffee Bean Path */}
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.8.6-3.46 1.6-4.8l11.2 11.2C15.46 19.4 13.8 20 12 20zm5.4-3.2L6.2 5.6C7.54 4.6 9.2 4 12 4c4.41 0 8 3.59 8 8 0 1.8-.6 3.46-1.6 4.8z" opacity="0" />
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm-1 14.8c-2.8-1.2-4.5-3.8-4.5-6.8 0-4.1 3.4-7.5 7.5-7.5 1.5 0 2.9.5 4 1.3L7.3 16.5c-.5-.4-.9-.8-1.3-1.3zm6.5-2.7L9.2 6.8c.8-.5 1.8-.8 2.8-.8 4.1 0 7.5 3.4 7.5 7.5 0 1.5-.5 2.9-1.3 4c-.2-.4-.4-.7-.7-1.4z" opacity="0"/>
          <circle cx="12" cy="12" r="7" fill="var(--primary)" />
        </svg>
      </div>


    </>
  );
};
