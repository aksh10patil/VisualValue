'use client'

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import Card from "@/components/Card";
import ArticleFooter from "@/components/ArticleFooter";

export default function Vision() {
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
    <>
    <div className="flex flex-col md:flex-row md:ml-64 mt-40 gap-10 px-6 max-w-7xl mx-auto">
      {/* Image Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full md:w-1/2 bg-white dark:bg-black rounded-lg overflow-hidden shadow-lg p-6"
      >
        <h1 className="text-2xl font-semibold mb-4 text-black dark:text-white">
            Labour v/s Vision
        </h1>
        <motion.div
          ref={imageRef}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="rounded-md overflow-hidden"
        >
          <motion.img
            src="/vision.png"
            alt="Sketch"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 text-gray-800 dark:text-gray-400 leading-relaxed">
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, delay: 0.4 }}
    className="mb-4 text-2xl text-gray-800 dark:text-gray-300"
  >

  Many people only focus on the hard work. They just keep digging. But the smartest people, the ones who truly succeed, use both.
  <br /><br />
  <strong className="text-white">Labour</strong> gives you the strength to build. <br />
  <strong className="text-white">Vision</strong> gives you the map to build the right thing.
  <br /><br />
  </motion.p>
  </div>
    </div>

    <ArticleFooter />
    </>

    
  );
}
