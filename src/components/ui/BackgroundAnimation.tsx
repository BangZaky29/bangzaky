/// C:\codingVibes\myPortfolio\bangzaky\src\components\ui\BackgroundAnimation.tsx


import React, { useEffect, useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// Brand Palette & 3D Lighting Colors
const COLORS = [
  { base: '#2dd4bf', highlight: '#99f6e4', shadow: '#115e59' }, // Teal
  { base: '#10b981', highlight: '#6ee7b7', shadow: '#065f46' }, // Emerald
  { base: '#0f766e', highlight: '#5eead4', shadow: '#0f1d1a' }, // Deep Teal
  { base: '#14b8a6', highlight: '#ccfbf1', shadow: '#0f1d1a' }, // Cyan-ish
];

const SHAPES = ['circle', 'square', 'triangle'] as const;
type ShapeType = typeof SHAPES[number];

interface ParticleData {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: typeof COLORS[number];
  shape: ShapeType;
  rotation: number;
  rotationSpeed: number;
  scaleX: number;
  scaleY: number;
  isDragging: boolean;
}

export const BackgroundAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const frameIdRef = useRef<number>(0);
  
  // Track dragging state globally for the physics loop
  const dragRef = useRef<{
    activeId: number | null;
    offsetX: number;
    offsetY: number;
    lastMouseX: number;
    lastMouseY: number;
  }>({
    activeId: null,
    offsetX: 0,
    offsetY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
  });

  // Helper to create a single particle
  const createParticle = (id: number, width: number, height: number): ParticleData => {
    const size = Math.random() * 80 + 50; // Bigger shapes for easier touching
    return {
      id,
      x: Math.random() * (width - size),
      y: Math.random() * (height - size),
      vx: (Math.random() - 0.5) * 1.0, 
      vy: (Math.random() - 0.5) * 1.0,
      size,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
      scaleX: 1,
      scaleY: 1,
      isDragging: false,
    };
  };

  // Initialization
  const [particles, setParticles] = useState<ParticleData[]>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;
    const particleCount = 12;

    return Array.from({ length: particleCount }).map((_, i) => createParticle(i, width, height));
  });

  // Handlers for adding/removing shapes
  const addShape = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const newId = Date.now() + Math.random();
    setParticles(prev => [...prev, createParticle(newId, width, height)]);
  };

  const removeShape = () => {
    setParticles(prev => {
      if (prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
  };

  // --- Interaction Handlers ---

  const handlePointerDown = (e: React.PointerEvent, p: ParticleData) => {
    // Prevent default to stop scrolling while dragging on mobile
    e.preventDefault();
    e.stopPropagation();

    // Calculate offset so the shape doesn't "snap" to center of mouse
    const offsetX = e.clientX - p.x;
    const offsetY = e.clientY - p.y;

    dragRef.current = {
      activeId: p.id,
      offsetX,
      offsetY,
      lastMouseX: e.clientX,
      lastMouseY: e.clientY,
    };

    p.isDragging = true;
    
    // Visual feedback: Scale up slightly
    p.scaleX = 1.1;
    p.scaleY = 1.1;
    
    // Change cursor
    document.body.style.cursor = 'grabbing';
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (dragRef.current.activeId === null) return;

      const p = particles.find(part => part.id === dragRef.current.activeId);
      if (!p) return;

      // Update position based on pointer
      const newX = e.clientX - dragRef.current.offsetX;
      const newY = e.clientY - dragRef.current.offsetY;

      // Calculate "Throw" velocity (Current Pos - Last Pos)
      // This gives the particle momentum when released
      const velocityX = e.clientX - dragRef.current.lastMouseX;
      const velocityY = e.clientY - dragRef.current.lastMouseY;

      p.x = newX;
      p.y = newY;
      p.vx = velocityX; 
      p.vy = velocityY;

      // Update last mouse pos for next frame calculation
      dragRef.current.lastMouseX = e.clientX;
      dragRef.current.lastMouseY = e.clientY;
    };

    const handlePointerUp = () => {
      if (dragRef.current.activeId !== null) {
        const p = particles.find(part => part.id === dragRef.current.activeId);
        if (p) {
          p.isDragging = false;
          // Cap max velocity so it doesn't vanish off screen instantly
          p.vx = Math.max(Math.min(p.vx, 15), -15);
          p.vy = Math.max(Math.min(p.vy, 15), -15);
        }
        dragRef.current.activeId = null;
        document.body.style.cursor = 'none'; // Revert to none for custom cursor
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [particles]);

  // --- Collision Logic ---
  const checkCollisions = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        // Determine centers
        const c1x = p1.x + p1.size / 2;
        const c1y = p1.y + p1.size / 2;
        const c2x = p2.x + p2.size / 2;
        const c2y = p2.y + p2.size / 2;

        const dx = c2x - c1x;
        const dy = c2y - c1y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Approximate collision radius as slightly smaller than half-size (visual overlap allowed)
        const minDist = (p1.size + p2.size) * 0.45; 

        if (distance < minDist) {
          // Collision Detected!
          
          // 1. Resolve Overlap (push them apart)
          const angle = Math.atan2(dy, dx);
          const overlap = minDist - distance;
          
          // If one is being dragged, it acts as an immovable object (infinite mass)
          if (p1.isDragging && !p2.isDragging) {
             p2.x += Math.cos(angle) * overlap;
             p2.y += Math.sin(angle) * overlap;
          } else if (!p1.isDragging && p2.isDragging) {
             p1.x -= Math.cos(angle) * overlap;
             p1.y -= Math.sin(angle) * overlap;
          } else if (!p1.isDragging && !p2.isDragging) {
             // Move both equally
             const moveX = Math.cos(angle) * overlap * 0.5;
             const moveY = Math.sin(angle) * overlap * 0.5;
             p1.x -= moveX;
             p1.y -= moveY;
             p2.x += moveX;
             p2.y += moveY;
          }

          // 2. Bounce (Elastic Collision)
          if (!p1.isDragging && !p2.isDragging) {
            // Normal vector
            const nx = dx / distance;
            const ny = dy / distance;

            // Relative velocity
            const dvx = p1.vx - p2.vx;
            const dvy = p1.vy - p2.vy;
            
            // Dot product of velocity and normal
            const dot = dvx * nx + dvy * ny;

            if (dot > 0) {
               // Mass approximation based on size
               const m1 = p1.size;
               const m2 = p2.size;
               
               // Coefficient of restitution (bounciness)
               const e = 0.9; 

               // Impulse scalar
               const impulse = (2 * dot) / (m1 + m2);
               
               // Apply impulse
               p1.vx -= impulse * m2 * nx * e;
               p1.vy -= impulse * m2 * ny * e;
               p2.vx += impulse * m1 * nx * e;
               p2.vy += impulse * m1 * ny * e;
            }
          }
          
          // If a dragged particle hits a static one, impart velocity to the static one
          if (p1.isDragging && !p2.isDragging) {
             // Push p2 away based on p1's movement
             p2.vx += Math.cos(angle) * 2;
             p2.vy += Math.sin(angle) * 2;
          }
          if (p2.isDragging && !p1.isDragging) {
             p1.vx -= Math.cos(angle) * 2;
             p1.vy -= Math.sin(angle) * 2;
          }
        }
      }
    }
  };

  // --- Animation Loop ---

  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Run collision detection
      checkCollisions();

      particles.forEach((p, i) => {
        const el = elementsRef.current[i];
        if (!el) return;

        if (!p.isDragging) {
          // 1. Physics Calculation
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotationSpeed;

          // 2. Air Resistance (Friction)
          // Slows down thrown objects over time until they reach floating speed
          p.vx *= 0.98; 
          p.vy *= 0.98;

          // Keep a minimum movement for the "floating" effect
          if (Math.abs(p.vx) < 0.2) p.vx += (Math.random() - 0.5) * 0.05;
          if (Math.abs(p.vy) < 0.2) p.vy += (Math.random() - 0.5) * 0.05;

          // 3. Elastic Recovery (Spring back to 1.0 scale after collision/drag)
          p.scaleX += (1 - p.scaleX) * 0.05;
          p.scaleY += (1 - p.scaleY) * 0.05;

          // 4. Wall Collision & Rubber Effect
          const squashFactor = 0.8; 
          const stretchFactor = 1.1;
          const bounce = -0.7; // Lose some energy on wall hit

          // Horizontal Bounds
          if (p.x <= -p.size/2) {
            p.x = -p.size/2;
            p.vx *= bounce;
            p.scaleX = squashFactor;
            p.scaleY = stretchFactor;
          } else if (p.x + p.size >= width + p.size/2) {
            p.x = width - p.size;
            p.vx *= bounce;
            p.scaleX = squashFactor;
            p.scaleY = stretchFactor;
          }

          // Vertical Bounds
          if (p.y <= -p.size/2) {
            p.y = -p.size/2;
            p.vy *= bounce;
            p.scaleX = stretchFactor;
            p.scaleY = squashFactor;
          } else if (p.y + p.size >= height + p.size/2) {
            p.y = height - p.size;
            p.vy *= bounce;
            p.scaleX = stretchFactor;
            p.scaleY = squashFactor;
          }
        } else {
            // While dragging, apply a constant slow rotation for style
            p.rotation += 2;
        }

        // 5. Update DOM directly
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg) scale(${p.scaleX}, ${p.scaleY})`;
        
        // Add specific class for cursor when hovering
        if (p.isDragging) {
            el.style.zIndex = '10'; // Bring to front
            el.style.filter = 'brightness(1.2) drop-shadow(0 20px 30px rgba(0,0,0,0.5))';
        } else {
            el.style.zIndex = '0';
            el.style.filter = '';
        }
      });

      frameIdRef.current = requestAnimationFrame(animate);
    };

    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [particles]);

  const getShapeStyles = (p: ParticleData): React.CSSProperties => {
    const common: React.CSSProperties = {
      position: 'absolute',
      width: p.size,
      height: p.size,
      left: 0,
      top: 0,
      opacity: 0.8, // Increased opacity for better touch visibility
      willChange: 'transform',
      cursor: 'none', // Important: hide default cursor here too
      touchAction: 'none', // Critical: prevents scrolling while dragging
      pointerEvents: 'auto', // Enable interaction
      // The "3D Glass" look base
      backdropFilter: 'blur(4px)',
      transition: 'filter 0.2s ease, z-index 0.2s ease',
    };

    // SPHERE (3D Ball)
    if (p.shape === 'circle') {
      return {
        ...common,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${p.color.highlight} 0%, ${p.color.base} 40%, ${p.color.shadow} 90%)`,
        boxShadow: `
          inset -5px -5px 15px rgba(0,0,0,0.3),
          5px 10px 20px rgba(0,0,0,0.2)
        `,
      };
    }

    // CUBE (Rounded Box with Bevel)
    if (p.shape === 'square') {
      return {
        ...common,
        borderRadius: '20%',
        background: `linear-gradient(135deg, ${p.color.highlight} 0%, ${p.color.base} 50%, ${p.color.shadow} 100%)`,
        boxShadow: `
          inset 2px 2px 4px rgba(255,255,255,0.4),
          inset -2px -2px 10px rgba(0,0,0,0.5),
          10px 10px 20px rgba(0,0,0,0.2)
        `,
        border: `1px solid ${p.color.highlight}44`
      };
    }

    // PYRAMID / TETRAHEDRON (Triangle)
    if (p.shape === 'triangle') {
      return {
        ...common,
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        background: `linear-gradient(160deg, ${p.color.highlight} 0%, ${p.color.base} 60%, ${p.color.shadow} 100%)`,
        filter: 'drop-shadow(5px 10px 10px rgba(0,0,0,0.3))' // Triangle needs filter for shadow
      };
    }

    return common;
  };

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed inset-0 overflow-hidden z-0 pointer-events-none" 
      >
        {particles.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => { elementsRef.current[i] = el; }}
            style={getShapeStyles(p)}
            onPointerDown={(e) => handlePointerDown(e, p)}
          >
              {/* Specular Highlight for extra 3D Gloss */}
              {p.shape !== 'triangle' && (
                  <div className="absolute top-[15%] left-[15%] w-[25%] h-[25%] rounded-full bg-gradient-to-br from-white/70 to-transparent blur-[3px] pointer-events-none" />
              )}
          </div>
        ))}
      </div>

      {/* Floating Controls */}
      <div className="fixed z-40 flex gap-3 pointer-events-auto bottom-6 right-6 flex-row md:top-28 md:right-6 md:flex-col">
        <button
          onClick={addShape}
          className="p-3 bg-bg-elevated/80 backdrop-blur-md border border-border-soft rounded-xl text-accent-primary hover:bg-accent-primary hover:text-bg-main transition-all shadow-2-5d active:scale-95 group"
          title="Add Shape"
        >
          <Plus size={20} className="group-hover:scale-110 transition-transform" />
        </button>
        <div className="text-center text-xs font-mono font-bold text-text-muted select-none bg-bg-main/50 rounded-lg py-1 px-3 md:px-0 border border-border-soft/30 backdrop-blur-sm flex items-center justify-center">
            {particles.length}
        </div>
        <button
          onClick={removeShape}
          className="p-3 bg-bg-elevated/80 backdrop-blur-md border border-border-soft rounded-xl text-accent-primary hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-all shadow-2-5d active:scale-95 group"
           title="Remove Shape"
        >
          <Minus size={20} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </>
  );
};
