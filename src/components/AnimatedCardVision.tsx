import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";

export default function AnimatedCardVision() {
    const textRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
        });
      }
    }, []);
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-xl mx-auto bg-white dark:bg-black rounded-2xl overflow-hidden shadow-lg p-6"
      >
        {/* Image Block */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mb-6 rounded-md overflow-hidden"
        >
          <motion.img
            src="/vision.png"
            alt="Leverage Sketch"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="w-full h-auto rounded-md"
          />
        </motion.div>
  
        {/* Text Block */}
        <div ref={textRef}>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Labour v/s Vision
          </h2>
          <p className="italic text-sm text-gray-500 mb-4">Jan 02, 2023</p>
          <p className="text-base text-gray-800 dark:text-gray-300 mb-4 leading-relaxed">
          Labor is the execution, while vision is the direction.
          </p>
  
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/ideas/vision"
              className="underline text-black dark:text-white font-medium"
            >
              Keep reading
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }