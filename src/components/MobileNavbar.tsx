'use client';

import Link from "next/link";

export default function MobileNavbar() {
  return (
    <div className="md:hidden w-full fixed top-0 left-0 z-30 bg-black text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
         V.V
        </Link>
        <Link href="/ideas" className="text-lg font-bold">
        Ideas
        </Link>
        <Link href="/books" className="text-lg font-bold">
        Must Read
        </Link>
        <Link href="/about" className="text-lg font-bold">
        About
        </Link>
        <Link href="https://twitter.com/awxshhhh" className="text-lg font-bold">
        Contact
        </Link>
      </div>
    </div>
  );
}
