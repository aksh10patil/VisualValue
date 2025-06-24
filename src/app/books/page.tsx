'use client'

import BookCard from "@/components/BookCard";

export default function Books() {
  return (
<>
                <main className="py-20 px-6 sm:px-8 md:px-6 md:ml-0 mb-8">
            <h1 className="text-2xl font-semibold text-center md:text-left">Must Read</h1>
            </main>


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
    </section>

    </>
  );
}
