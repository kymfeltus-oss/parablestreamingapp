// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar is not needed here, can be included in a global wrapper if desired

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexusFaith | Future Ministry",
  description: "The next generation streaming platform for ministry and worship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Set the background and text colors globally here */}
      <body className={`${inter.className} bg-[#0e0e0e] text-white`}>
        {/* 'children' is where your FeedPage, CreatorPage, etc. will render */}
        {children} 
      </body>
    </html>
  );
}
