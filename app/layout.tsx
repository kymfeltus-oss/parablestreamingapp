export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import "./globals.css";
import { Inter } from "next/font/google";
import ClientBottomNav from "./mobile-bottom-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Parable Streaming | Streaming. Creating. Believing.",
  description:
    "Parable Streaming is a faith-centered platform for pastors, musicians, creators, and ministries.",
  metadataBase: new URL("https://www.parablestreaming.com"),
  openGraph: {
    title: "Parable Streaming",
    description:
      "Stream • Create • Worship • Connect — A home for pastors, musicians, and gospel creators.",
    url: "https://www.parablestreaming.com",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@parable",
    title: "Parable Streaming",
    description:
      "A faith-first streaming platform for ministries, musicians, and creators.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* APP ICONS */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        <div className="flex-1">{children}</div>
        <ClientBottomNav />
      </body>
    </html>
  );
}
