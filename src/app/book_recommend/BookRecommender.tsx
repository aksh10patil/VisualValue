'use client'
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
    book: {
      title: string;
      author: string;
      description: string;
    };
    index: number;
  };

function AnimatedBookCard({ book, index }: Props) {
    return (
      <motion.li
        className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
        <h3 className="text-sm text-black mb-2">by {book.author}</h3>
        <p className="text-sm text-gray-900">{book.description}</p>
      </motion.li>
    );
  }
  

export default function BookRecommender() {
  const [topic, setTopic] = useState('');
  const [books, setBooks] = useState<
  { title: string; author: string; description: string }[]
>([]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/recommend-books', {
      method: 'POST',
      body: JSON.stringify({ topic }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setBooks(data.books);
    setLoading(false);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <h1
        onClick={scrollToForm}
        className="text-2xl ml-10 mt-10 hover:underline cursor-pointer"
      >
        Type the Keyword Below to search for the Book?
      </h1>

      <div
        ref={formRef}
        className="p-8 border-2 ml-10 sm:rounded-2xl max-w-lg mx-auto mt-12"
      >
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Type a topic (e.g. decision making)"
          className="p-2 border-2 rounded-2xl w-full mb-2"
        />

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-white text-black mt-5 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
          >
            Recommend Books
          </button>
        </div>

        {loading && <p className="mt-4 text-center">Reading Abstract...</p>}

        <ul className="mt-6 space-y-4">
            {books.map((book, i) => (
                <AnimatedBookCard key={i} book={book} index={i} />
            ))} 
            </ul>
      </div>
    </div>
  );
}
