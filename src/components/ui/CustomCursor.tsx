
import React, { useEffect, useState, useRef } from 'react';
import { Pointer, MousePointerClick, TextCursor, Zap, MoveHorizontal, Gauge } from 'lucide-react';

type CursorType = 'default' | 'pointer' | 'text';

export const CustomCursor: React.FC = () => {
  // Refs for animation loop values to avoid re-renders during high-frequency mouse moves
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Physics state (mutable refs)
  const positionRef = useRef({ x: -100, y: -100 }); // Current visual position
  const targetRef = useRef({ x: -100, y: -100 });   // Actual mouse position
  
  // Configuration state
  const [speedLevel, setSpeedLevel] = useState(5); // Scale 1-10
  const speedFactorRef = useRef(0.15); // The actual lerp factor

  // Visual State
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [isClicking, setIsClicking] = useState(false);

  // Update physics factor when UI level changes
  useEffect(() => {
    // Level 1 = 0.03 (Very Slow/Floaty)
    // Level 10 = 1.0 (Instant/System-like)
    // Non-linear mapping feels better
    if (speedLevel === 10) {
        speedFactorRef.current = 1.0;
    } else {
        speedFactorRef.current = 0.03 + (speedLevel * 0.04);
    }
  }, [speedLevel]);

  // Handlers
  const increaseSpeed = () => setSpeedLevel(p => Math.min(p + 1, 10));
  const decreaseSpeed = () => setSpeedLevel(p => Math.max(p - 1, 1));

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Update target, not the visual element directly
      targetRef.current = { x: e.clientX, y: e.clientY };
      
      // If speed is instant, sync immediately to prevent any visual drift
      if (speedFactorRef.current === 1.0) {
          positionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Detect hover targets to change cursor icon
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for buttons/links
      // Note: We deliberately removed the check that ignored .cursor-controls
      // so the cursor can properly react to the speed buttons too.
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer');

      // Check for text inputs
      const isText = 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (isText) {
        setCursorType('text');
      } else if (isClickable) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  // Animation Loop (Lerp)
  useEffect(() => {
    let frameId: number;

    const animate = () => {
       const { x: targetX, y: targetY } = targetRef.current;
       const { x: currentX, y: currentY } = positionRef.current;
       
       const speed = speedFactorRef.current;
       
       // Linear Interpolation: Current + (Target - Current) * Factor
       const nextX = currentX + (targetX - currentX) * speed;
       const nextY = currentY + (targetY - currentY) * speed;
       
       // Snap if close enough to stop micro-jitters
       const dist = Math.abs(targetX - nextX) + Math.abs(targetY - nextY);
       
       if (dist < 0.1) {
           positionRef.current = { x: targetX, y: targetY };
       } else {
           positionRef.current = { x: nextX, y: nextY };
       }

       if (cursorRef.current) {
         // Apply transform
         cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
       }
       
       frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Map types to Icons
  const getIcon = () => {
    switch (cursorType) {
      case 'pointer':
        return <MousePointerClick strokeWidth={1.5} className="w-6 h-6 text-accent-primary" />;
      case 'text':
        return <TextCursor strokeWidth={1.5} className="w-5 h-5 text-accent-soft" />;
      case 'default':
      default:
        return <Pointer strokeWidth={1.5} className="w-6 h-6 text-accent-primary fill-accent-primary/20" />;
    }
  };

  return (
    <>
      {/* Global style to hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        /* Restore cursor for our controls to make them usable */
        .cursor-controls, .cursor-controls button {
           cursor: none !important; /* Keep custom cursor visual */
        }
      `}</style>

      {/* The Cursor Element */}
      {/* Z-Index increased to 10000 to be above Portals/Modals (9999) */}
      <div
        ref={cursorRef}
        className={`
          fixed top-0 left-0 pointer-events-none z-[10000]
          flex items-center justify-center
          -ml-3 -mt-3
          transition-transform duration-0 /* Handled by JS */
          ${isClicking ? 'scale-90' : 'scale-100'}
        `}
        style={{ willChange: 'transform' }}
      >
        <div className={`
          relative
          transition-all duration-300 ease-out
          ${cursorType === 'pointer' ? 'drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]' : 'drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]'}
        `}>
          {getIcon()}
        </div>
      </div>

      {/* Floating Speed Controls (Hidden on Mobile) */}
      {/* Z-Index set to 100 to stay above standard UI but below Cursor */}
      <div className="cursor-controls hidden md:flex fixed top-80 right-6 z-[100] flex-col gap-3 pointer-events-auto">
        <button
          onClick={increaseSpeed}
          disabled={speedLevel >= 10}
          className="p-3 bg-bg-elevated/80 backdrop-blur-md border border-border-soft rounded-xl text-accent-primary hover:bg-accent-primary hover:text-bg-main transition-all shadow-2-5d active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group relative"
          title="Increase Cursor Speed"
        >
          <Zap size={20} className="group-hover:scale-110 transition-transform fill-current" />
        </button>
        
        <div className="flex flex-col items-center justify-center gap-1 bg-bg-main/50 rounded-lg py-2 border border-border-soft/30 backdrop-blur-sm select-none">
            <Gauge size={14} className="text-text-muted" />
            <span className="text-xs font-mono font-bold text-accent-primary">
                {speedLevel === 10 ? 'MAX' : `${speedLevel}`}
            </span>
        </div>

        <button
          onClick={decreaseSpeed}
          disabled={speedLevel <= 1}
          className="p-3 bg-bg-elevated/80 backdrop-blur-md border border-border-soft rounded-xl text-accent-primary hover:bg-accent-primary hover:text-bg-main transition-all shadow-2-5d active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
           title="Decrease Cursor Speed"
        >
          <MoveHorizontal size={20} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </>
  );
};
