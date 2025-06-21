'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type Article = {
  title: string
  excerpt: string
  imageSrc: string
  link: string
}

const articles: Article[] = [
  {
    title: "Understanding Leverage",
    excerpt: "Leverage is as much about where you are standing as how much force you are applying.",
    imageSrc: "/lev.png",
    link: "/ideas/leverage",
  },
  {
    title: "Labour v/s Vision",
    excerpt: "Labor is the execution, while vision is the direction.",
    imageSrc: "/vision.png",
    link: "/ideas/vision",
  },
  {
    title: "Execution with Insight",
    excerpt: "What happens when brute force meets strategic clarity?",
    imageSrc: "/insight.png",
    link: "/ideas/insight",
  },
]

export default function ArticleSlider() {
  const [index, setIndex] = useState(0)

  const next = () => {
    setIndex((prev) => (prev + 1) % articles.length)
  }

  const prev = () => {
    setIndex((prev) => (prev - 1 + articles.length) % articles.length)
  }

  const { title, excerpt, imageSrc, link } = articles[index]

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-black rounded-2xl shadow-lg text-center">
      <img src={imageSrc} alt={title} className="w-full h-64 object-cover rounded-md mb-4" />

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{excerpt}</p>

      <Link href={link} className="underline text-black dark:text-white font-semibold">
        Keep reading →
      </Link>

      <div className="mt-6 flex justify-between">
        <button onClick={prev} className="text-sm flex items-center gap-2 hover:underline">
          <ArrowLeft size={16} />
          Back
        </button>
        <button onClick={next} className="text-sm flex items-center gap-2 hover:underline">
          Next
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
