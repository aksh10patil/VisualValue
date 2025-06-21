'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react'

const articles = [
  { title: "Understanding Leverage", path: "/ideas/leverage" },
  { title: "Labour v/s Vision", path: "/ideas/vision" },
  { title: "Your Untouchable Niche", path: "/ideas/niche" },
]

export default function ArticleFooter() {
  const pathname = usePathname()
  const currentIndex = articles.findIndex(article => article.path === pathname)

  const prev = currentIndex > 0 ? articles[currentIndex - 1] : null
  const next = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: articles[currentIndex]?.title,
        url: window.location.href,
      }).catch((err) => console.error('Sharing failed:', err))
    } else {
      alert('Web Share API not supported')
    }
  }

  return (
    <div className="mt-70 px-6 sm:px-10 md:px-100 py-10 flex flex-col md:flex-row justify-between items-center text-gray-900 dark:text-white border-t border-dashed border-white dark:border-white gap-4">
      {/* Share button */}
      <button onClick={handleShare} className="flex items-center gap-2 text-sm hover:underline">
        <Share2 size={18} /> Share
      </button>

      {/* Navigation buttons */}
      <div className="flex justify-between w-full md:w-auto gap-10">
        {prev && (
          <Link href={prev.path} className="flex items-center gap-2 text-sm hover:underline">
            <ArrowLeft size={18} /> Previous article
          </Link>
        )}

        {next && (
          <Link href={next.path} className="flex items-center gap-2 text-sm hover:underline">
            Next article <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </div>
  )
}
