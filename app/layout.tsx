import "./globals.css";
import Link from "next/link";
import { Home, Compass, Video, Library, User } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nexus Platform",
  description: "Faith-based content app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Bottom nav MUST be client-side, so we wrap only that part.
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white pb-20`}>
        {children}

        {/* CLIENT SIDE NAVIGATION BAR */}
        <MobileBottomNav />
      </body>
    </html>
  );
}

/* ---- CLIENT COMPONENT BELOW ---- */
"use client";

function MobileBottomNav() {
  const path = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-white/10 px-4 py-2 flex justify-between items-center lg:hidden z-50">

      <NavItem href="/feed" label="Home" icon={Home} active={path === "/feed"} />

      <NavItem href="/discover" label="Browse" icon={Compass} active={path.startsWith("/discover")} />

      <NavItem href="/stream" label="Stream" icon={Video} active={path.startsWith("/stream")} />

      <NavItem href="/library" label="Library" icon={Library} active={path.startsWith("/library")} />

      <NavItem href="/profile" label="Profile" icon={User} active={path.startsWith("/profile")} />
    </div>
  );
}

function NavItem({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: any;
  active: boolean;
}) {
  return (
    <Link href={href} className="flex flex-col items-center text-xs">
      <Icon className={`w-6 h-6 ${active ? "text-white" : "text-gray-400"}`} />
      <span className={active ? "text-white" : "text-gray-400"}>{label}</span>
    </Link>
  );
}
