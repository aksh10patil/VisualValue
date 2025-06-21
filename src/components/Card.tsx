'use client'

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";

type CardProps = {
  title: string;
  excerpt: string;
  imageSrc: string;
  link: string;
};

export default function Card({ title, excerpt, imageSrc, link }: CardProps) {
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
  className="w-full max-w-md h-full bg-white dark:bg-black text-left rounded-2xl shadow-xl overflow-hidden p-6 flex flex-col justify-between"
>
  {/* Image */}
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="rounded-md overflow-hidden mb-5 aspect-[4/3] w-full"
  >
    <motion.img
      src={imageSrc}
      alt={title}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      className="w-full h-full object-cover"
    />
  </motion.div>

  {/* Text */}
  <div ref={textRef} className="flex flex-col justify-between flex-grow">
    {/* Title Link */}
    <Link href={link}>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2 hover:underline hover:cursor-pointer transition-all duration-200">
        {title}
      </div>
    </Link>

    {/* Excerpt */}
    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
      {excerpt}
    </p>

    {/* Footer Link */}
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link
        href={link}
        className="underline font-semibold text-black dark:text-white mt-auto"
      >
        Keep reading
      </Link>
    </motion.div>
  </div>
</motion.div>

  );
}
