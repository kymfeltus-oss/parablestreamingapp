import "./globals.css";
import { Inter } from "next/font/google";
import ClientBottomNav from "./mobile-bottom-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nexus Platform",
  description: "Faith-based content app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white pb-20`}>
        {children}
        <ClientBottomNav />
      </body>
    </html>
  );
}
