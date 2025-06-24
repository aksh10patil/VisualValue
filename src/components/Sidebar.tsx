'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  // ✅ Disable body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* ✅ Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black text-white z-50 flex items-center justify-between px-4 py-3 shadow-md">
        <div className="text-xl font-bold">⋃.⋃</div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* ✅ Backdrop when sidebar is open (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ✅ Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-black text-white z-50 p-6 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:flex
      `}>
        {/* Sidebar content */}
        <div>
<<<<<<< HEAD
          <div className="text-2xl font-bold mb-10">⋃.⋃</div>

          <nav className="space-y-6 text-lg font-medium text-gray-100">
            <Link href="/" className="block hover:text-white" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/ideas" className="block hover:text-white" onClick={() => setIsOpen(false)}>Ideas</Link>
            <Link href="/about" className="block hover:text-white" onClick={() => setIsOpen(false)}>Our Philosophy</Link>
            <Link href="/books" className="block hover:text-white" onClick={() => setIsOpen(false)}>Must Read</Link>
          </nav>
        </div>

        <div className="text-xs text-gray-400">© 2025 U.U</div>
=======
          <div className="flex justify-between items-center mb-10">
            <div className="text-2xl font-bold text-black dark:text-white">V.V</div>
          </div>

          {/* Nav links */}
          <nav className="space-y-6 text-lg font-medium text-gray-800 dark:text-gray-100">
            <Link href="/" className="block hover:text-black dark:hover:text-white">Home</Link>
            <Link href="/ideas" className="block hover:text-black dark:hover:text-white">Ideas</Link>
            <Link href="/about" className="block hover:text-black dark:hover:text-white">Our Philosophy</Link>
            <Link href="/books" className="block hover:text-black dark:hover:text-white">Get more ideas like these / Must Read</Link>
          </nav>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-400 dark:text-gray-600">© 2025 V.V</div>
>>>>>>> new-feature-branch
      </div>
    </>
  )
}
