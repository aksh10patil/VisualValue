'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const textContent = `Our Philosophy :

More Than Just Seeing, It's About Understanding.

Ever felt like the world's most profound ideas get lost in a tangle of words? Or that the path to personal growth feels overwhelmingly complicated? That's exactly why Visual Value was born.

This isn't just another website; it's my personal quest to distill life's grand concepts into something beautifully simple, something you can feel as much as you understand. Imagine taking a deep breath, and letting a complex idea simply... click. That's the magic I chase with every minimalist line and illustration.

Here, we explore:

The DNA of Growth: Not just "how to succeed," but the subtle, foundational shifts that truly accelerate your journey, personally and professionally.

A Deeper Gaze: We'll unpack real-life concepts, making the intricate surprisingly clear. Think of it as a quiet conversation with your own insights.

Whispers of the Cosmos: This is where we pause to truly listen. It's about recognizing the grander intelligence woven into the fabric of existence, and how those universal threads connect to our everyday lives. It's not about being lectured; it's about seeing the patterns yourself.

Action, Ignited by Insight: Because understanding isn't enough. When you truly grasp a concept, the right next step often reveals itself, leading to initiatives that are not just effective, but genuinely meaningful.

Visual Value is my quiet space for turning fleeting thoughts into lasting clarity, for transforming big questions into simple truths. Join me, and let's discover the hidden wisdom in plain sight, together.`;

export default function About() {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < textContent.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + textContent[index]);
        setIndex(index + 1);
      }, 25); // typing speed
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <main className="min-h-screen px-6 sm:px-8 md:px-32 pt-20 pb-10 text-white font-sans max-w-screen-lg mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4 }}
        className="bg-black backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl"
      >
        <pre className="whitespace-pre-wrap text-lg leading-relaxed font-light">
          {displayedText}
        </pre>
      </motion.div>
    </main>
  );
}
