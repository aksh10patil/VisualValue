
import Footer from "@/components/Footer";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Funnel_Display } from 'next/font/google';

const funnelDisplay = Funnel_Display({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html  lang="en" className={funnelDisplay.className} >
      <body className={`${funnelDisplay.className} flex`}>
        {/* Sidebar: visible only on md+ screens */}
        <div className="hidden md:block w-64 h-screen fixed top-0 left-0 z-50 bg-black">
          <Sidebar />
        </div>

        {/* Content area: full width on mobile, shifted on md+ */}
        <main className="w-full">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
