import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/layout/Background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdFlow Pro | Premium Sponsored Listing Marketplace",
  description: "The advanced moderated marketplace where quality meets visibility. Post your ads with ease and reach your audience effectively.",
};

import { ClientOnly } from "@/components/layout/ClientOnly";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#050505] text-white selection:bg-primary/30" suppressHydrationWarning>
        <ClientOnly>
          <Background />
          {children}
        </ClientOnly>
      </body>
    </html>
  );
}
