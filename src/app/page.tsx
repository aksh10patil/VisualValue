"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link"; 

export default function LandingPage() {
  useEffect(() => {
    const canvas = document.getElementById("particles") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");
    const particles: { x: number; y: number; radius: number; speedX: number; speedY: number }[] = [];

    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      for (let i = 0; i < 500; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
        });
      }

      function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        particles.forEach(p => {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
        requestAnimationFrame(animate);
      }

      animate();
    }
  }, []);

  return (
    <main className="h-screen md:ml-32 w-full flex items-center justify-center bg-gradient-to-br from-black
     via-gray-900 to-black text-white overflow-hidden relative">
      <canvas
        id="particles"
        className="absolute inset-0 z-0"
      ></canvas>

      <motion.div
        className="text-center p-10 rounded-3xl shadow-2xl bg-black/40 backdrop-blur-md border border-white/10 max-w-4xl relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Visual Values
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Where clarity meets creativity. Visualize impactful ideas with purpose,
          style, and motion.
        </motion.p>


       <Link href="/ideas" passHref>
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block px-6 py-3 bg-white text-black rounded-full font-semibold transition duration-300 hover:bg-gray-100"
      >
        Get Started
      </motion.a>
      </Link>

      </motion.div>
    </main>
  );
}
