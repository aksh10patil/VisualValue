import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Funnel_Display } from 'next/font/google';

const funnelDisplay = Funnel_Display({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'], // Load all needed weights  // For Tailwind usage (optional)
  display: 'swap',                     // Recommended for performance
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={funnelDisplay.className}>
      <body className={funnelDisplay.className}>
      <div className="fixed top-0 left-0 h-screen w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black z-50">
          <Sidebar />
        </div>

        


        {children}
      </body>
    </html>
  );
}

