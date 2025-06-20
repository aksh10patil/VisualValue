'use client'

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";

import AnimatedCard from "@/components/AnimatedCard";



function AnimatedCardVision() {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.from(textRef.current, {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="max-w-xl mx-auto bg-white dark:bg-black rounded-lg overflow-hidden shadow-lg p-6"
    >
      <motion.div
        ref={imageRef}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="mb-4 rounded-md overflow-hidden"
      >

      <motion.img
        src="/vision.png"
        alt="Sketch"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="w-full h-auto"
      />

      </motion.div>
    
      <div ref={textRef}>
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Labour v/s Vision
        </h2>
        <p className="italic text-gray-500 text-sm mb-4">Jan 02, 2023</p>
        <p className="text-gray-800 dark:text-gray-300 mb-4">
        Labor is the execution, while vision is the direction.
        </p>
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="underline text-black dark:text-white font-medium"
        >
          Keep reading
        </motion.a>
      </div>
    </motion.div>
  );
}


export default function ideas() {
    return <>
     
          <main className="ml-64 p-6">
            <h1 className="text-xl font-semibold">Ideas</h1>
           </main>

           <div className="ml-64 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <AnimatedCard />
        <AnimatedCardVision/>


      
      </div>
    </>
  }
  