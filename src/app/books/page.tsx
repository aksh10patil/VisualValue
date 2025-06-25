'use client'

import BookCard from "@/components/BookCard";
import BookRecommender from "../book_recommend/BookRecommender";

export default function Books() {
  return (
<>
                <main className="py-20 px-6 sm:px-8 md:px-6 md:ml-0 mb-8">
            <h1 className="text-2xl font-semibold text-center md:text-left">Must Read</h1>
            </main>

            <h1
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="text-2xl ml-7 hover:underline cursor-pointer"
             >
                Want a Personalised book recommend?
            </h1>



    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
      <BookCard
        title="The Almanack of Naval Ravikant"
        author="Eric Jorgenson"
        description="Timeless principles from a tech philosopher on wealth, happiness, and decision making."
        image="/naval.png"
        link="https://www.navalmanack.com/"
      />
      <BookCard
        title="Meditations"
        author="Marcus Aurelius"
        description="Stoic wisdom from a Roman Emperor on self-discipline, mortality, and purpose."
        image="/med.png"
        link="https://www.goodreads.com/book/show/30659.Meditations"
      />
      <BookCard
        title="Atomic Habits"
        author="James Clear"
        description="A practical guide to building better habits and breaking bad ones through tiny daily improvements."
        image="/habits.png"
        link="https://www.goodreads.com/book/show/40121378-atomic-habits"
      />

      <BookCard
        title="Deep Work"
        author="Cal Newport"
        description="Teaches the power of focused, distraction-free work to produce high-quality output in less time."
        image="/deep.png"
        link="https://www.goodreads.com/book/show/25744928-deep-work"
      />

      <BookCard
        title="Thinking, Fast and Slow"
        author="Daniel Kahneman"
        description="Explores how our minds operate using two systems—intuitive and deliberate—and how they affect our decisions."
        image="/thinking.png"
        link="https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow"
      />

    </section>
  

    <BookRecommender />

   

    </>
  );
}
