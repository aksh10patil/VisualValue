'use client'

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import ArticleSlider from "@/components/ArticleSlider";
import ArticleFooter from "@/components/ArticleFooter";

export default function Leverage() {
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
<<<<<<< HEAD
    <div className="flex flex-col md:flex-row md:ml-64 mt-40 gap-10 px-6 max-w-7xl mx-auto">

=======
    <div className="flex flex-col md:flex-row mt-40 gap-10 px-6 max-w-7xl mx-auto">
>>>>>>> new-feature-branch
      {/* Image Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full md:w-1/2 bg-white dark:bg-black rounded-lg overflow-hidden shadow-lg p-6"
      >
        <h1 className="text-2xl font-semibold mb-4 text-black dark:text-white">
          Understanding Leverage as a Driving Force
        </h1>
        <motion.div
          ref={imageRef}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="rounded-md overflow-hidden"
        >
          <motion.img
            src="/lev.png"
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
    <span className="text-3xl">E</span>ver wonder how some achieve
    <strong className="text-white"> maximal output</strong> with
    <strong className="text-white"> minimal effort</strong>? It's not magic; it's the profound power of
    <strong className="text-white"> leverage</strong>. This isn't about
    <strong className="text-white"> working harder</strong>, but
    <strong className="text-white"> smarter</strong>—understanding exactly where to apply your
    <strong className="text-white"> energy</strong> for the greatest
    <strong className="text-white"> impact</strong>.
  </motion.p>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, delay: 1 }}
    className="mb-4 text-2xl text-gray-800 dark:text-gray-300"
  >
    <strong className="text-white">Invest</strong> in learning
    <strong className="text-white"> new skills</strong> or deepening existing ones. The
    <strong className="text-white"> more capable</strong> you become, the more
    <strong className="text-white"> effective</strong> your actions will be. A
    <strong className="text-white"> coding skill</strong>, for example, allows you to
    <strong className="text-white"> build solutions</strong> that
    <strong className="text-white"> scale</strong>.
  </motion.p>
</div>

    </div>

      <ArticleFooter />
    </>
  );
}
