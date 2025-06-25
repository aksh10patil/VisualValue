'use client'

import Image from 'next/image'

interface BookCardProps {
  title: string
  author: string
  description: string
  image: string
  link?: string
}

export default function BookCard({
  title,
  author,
  description,
  image,
  link,
}: BookCardProps) {
  return (
    <div className="bg-white dark:bg-black shadow-md rounded-xl overflow-hidden max-w-sm hover:scale-105 transition">
      
      {/* Book cover wrapper with black background */}
      <div className="bg-black flex items-center justify-center p-4">
        <Image
          src={image}
          alt={title}
          width={160}
          height={240}
          className="object-contain rounded-md shadow-lg"
        />
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <h3 className="text-sm text-gray-500 dark:text-gray-400 italic">
          by {author}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mt-auto text-sm"
          >
            Read more →
          </a>
        )}
      </div>
    </div>
  )
}
