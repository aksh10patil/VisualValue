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
    <html lang="en" className={funnelDisplay.className}>
      <body className={`${funnelDisplay.className} flex`}>
        {/* ✅ Always render Sidebar. It controls its own visibility internally */}
        <Sidebar />

        {/* ✅ Content area: shifted on md+ because Sidebar is 64px wide */}
        <main className="w-full md:ml-64">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
