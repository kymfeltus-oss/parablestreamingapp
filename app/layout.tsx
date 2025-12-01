import "./globals.css";
import { Inter } from "next/font/google";
import ClientBottomNav from "./mobile-bottom-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Parable",
  description: "Faith-based streaming for creators",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        
        {/* MAIN PAGE CONTENT */}
        <div className="flex-1">{children}</div>

        {/* MOBILE NAV ALWAYS ON BOTTOM */}
        <ClientBottomNav />

      </body>
    </html>
  );
}{/* rebuild trigger */}

