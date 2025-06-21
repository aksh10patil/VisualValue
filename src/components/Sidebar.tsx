'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger for small screens */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black dark:text-white" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white dark:bg-black text-white z-40 p-6 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:flex
      `}>
        {/* Top section: logo */}
        <div>
          <div className="flex justify-between items-center mb-10">
            <div className="text-2xl font-bold text-black dark:text-white">⋃.⋃</div>
          </div>

          {/* Nav links */}
          <nav className="space-y-6 text-lg font-medium text-gray-800 dark:text-gray-100">
            <Link href="/" className="block hover:text-black dark:hover:text-white">Home</Link>
            <Link href="/ideas" className="block hover:text-black dark:hover:text-white">Ideas</Link>
            <Link href="/about" className="block hover:text-black dark:hover:text-white">About</Link>
            <Link href="/books" className="block hover:text-black dark:hover:text-white">Get more ideas like these / Must Read</Link>
          </nav>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-400 dark:text-gray-600">© 2025 U.U</div>
      </div>
    </>
  )
}
