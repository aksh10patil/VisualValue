'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

import Link from 'next/link';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulse: number;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function App(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const geometryRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  const { scrollYProgress } = useScroll();
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);
  const scaleTransform = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 1.1]));

  // Enhanced particle system with mouse interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const setCanvasDimensions = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasDimensions();

    const particles: Particle[] = [];
    const numberOfParticles = 120;
    const maxConnectionDistance = 120;

    // Initialize particles
    for (let i = 0; i < numberOfParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.35 + 0.15, // 50% less
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const handleMouseMove = (e: MouseEvent): void => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = (): void => {
      if (!ctx) return;
      
      // Create trailing effect instead of clearing completely
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      particles.forEach((particle, index) => {
        // Mouse interaction - attract particles to mouse
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          particle.speedX += (dx / distance) * force * 0.001;
          particle.speedY += (dy / distance) * force * 0.001;
        }

        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Add slight gravitational drift
        particle.speedX *= 0.999;
        particle.speedY *= 0.999;

        // Boundary collision with damping
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Pulsing effect
        particle.pulse += 0.02;
        const pulseOpacity = (particle.opacity + Math.sin(particle.pulse) * 0.3) * 0.5;


        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${pulseOpacity})`);
        gradient.addColorStop(0.5, `rgba(156, 163, 175, ${pulseOpacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(156, 163, 175, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Enhanced connection lines
      particles.forEach((p1, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxConnectionDistance) {
            const opacity = (1 - (distance / maxConnectionDistance)) * 0.4;
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(156, 163, 175, ${opacity * 0.8})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', setCanvasDimensions);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  // GSAP animations on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const gsap = (window as any).gsap;
      if (!gsap) return;
  
      gsap.registerPlugin((window as any).ScrollTrigger);
  
      gsap.fromTo('.hero-title', {
        y: 100,
        opacity: 0,
        scale: 0.8
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5
      });

      // Hero subtitle stagger
      gsap.fromTo('.hero-subtitle', {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 1.2,
        stagger: 0.1
      });

      // Floating elements
      gsap.to('.floating-line', {
        y: -20,
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2
      });

      // Section animations on scroll
      gsap.registerPlugin((window as any).ScrollTrigger);
      
      gsap.fromTo('.section-title', {
        y: 80,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      setIsLoaded(true);
    };
    
    document.head.appendChild(script);
    
    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
    document.head.appendChild(scrollTriggerScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(scrollTriggerScript);
    };
  }, []);

  // Geometric shape interaction
  const handleGeometryMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!geometryRef.current) return;
    
    const rect = geometryRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const normalizedX = mouseX / (rect.width / 2);
    const normalizedY = mouseY / (rect.height / 2);

    setMousePos({
      x: -normalizedY * 15,
      y: normalizedX * 15,
    });
  }, []);

  const handleGeometryLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <>
<div ref={containerRef} className="min-h-screen w-full bg-black text-white overflow-x-hidden pb-32">
      <style jsx>{`
     
        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #9ca3af 70%, #6b7280 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .card-glass:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-5px);
        }

        .geometric-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .hero-line {
          background: linear-gradient(90deg, transparent 0%, #6b7280 50%, transparent 100%);
        }
      `}</style>

<canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-30 pointer-events-none" />


      {/* Hero Section */}
      <motion.section 
        className="flex items-center justify-center min-h-screen relative z-10 px-6"
        style={{ y: yTransform, opacity: opacityTransform }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="hero-title text-7xl md:text-9xl font-light mb-8 gradient-text tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            Visual Values
          </motion.h1>
          
          <motion.div className="space-y-2 mb-16">
            {["Where", "ideas", "transcend", "words", "through", "elegant", "design"].map((word, index) => (
              <motion.span
                key={word}
                className="hero-subtitle inline-block text-xl md:text-2xl text-gray-300 font-light mx-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 + index * 0.1 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.div 
            className="floating-line w-px h-20 hero-line mx-auto opacity-60"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 3 }}
          />
        </div>
      </motion.section>

      {/* Philosophy Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-24 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="section-title text-5xl md:text-6xl font-light mb-8 gradient-text">
              Philosophy
            </h2>
            <motion.p 
              className="text-gray-300 text-xl leading-relaxed mb-8 font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              We believe in the power of visual communication—where clarity meets aesthetics, 
              and simplicity speaks volumes.
            </motion.p>
            <motion.p 
              className="text-gray-400 text-lg leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Every element serves a purpose. Every interaction tells a story. 
              This is design with intention.
            </motion.p>
          </motion.div>
          
          <motion.div 
            ref={geometryRef}
            className="geometric-container flex justify-center"
            onMouseMove={handleGeometryMove}
            onMouseLeave={handleGeometryLeave}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div 
              className="w-80 h-80 relative cursor-pointer"
              style={{
                rotateX: mousePos.x,
                rotateY: mousePos.y,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              <motion.div 
                className="absolute inset-4 border border-gray-500 rotate-45"
                animate={{ rotate: [45, 135, 45] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-12 border border-gray-400"
                animate={{ rotate: [0, -90, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-20 border border-gray-300 rotate-45"
                animate={{ rotate: [45, 180, 45] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-32 w-16 h-16 bg-white rounded-full blur-sm"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="section-title text-5xl md:text-6xl font-light text-center mb-20 gradient-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Principles
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Clarity",
                description: "Ideas distilled to their essence, removing noise to reveal truth.",
                delay: 0
              },
              {
                title: "Purpose",
                description: "Every design decision serves the story, every element has meaning.",
                delay: 0.2
              },
              {
                title: "Impact",
                description: "Creating moments that resonate, inspire, and drive change.",
                delay: 0.4
              }
            ].map((principle, index) => (
              <motion.div 
                key={principle.title}
                className="card-glass p-8 rounded-xl transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: principle.delay }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.h3 
                  className="text-2xl font-medium mb-6 text-gray-100"
                  whileHover={{ color: "#ffffff" }}
                >
                  {principle.title}
                </motion.h3>
                <p className="text-gray-400 leading-relaxed font-light text-lg">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="section-title text-5xl md:text-6xl font-light mb-12 gradient-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Experience
          </motion.h2>
          
          <motion.p 
            className="text-2xl text-gray-300 mb-16 font-light max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Join us as creators, thinkers, and visionaries who understand 
            that the future of communication is visual, intentional, and beautiful.
          </motion.p>
          
          <motion.div 
            className="relative max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div 
              className="card-glass rounded-2xl p-12 cursor-pointer group"
              whileHover={{ 
                scale: 1.05,
                background: "rgba(255, 255, 255, 0.08)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="w-3 h-3 bg-white rounded-full mx-auto mb-6"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

          <Link href="/ideas" className="text-gray-200 font-light text-lg hover:underline transition duration-200">
            Begin your journey
          </Link>


            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>

   
    </>
  );
}