import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Micro C Media — Creative Digital Agency",
  description:
    "Micro C Media is a premium creative digital agency specializing in web development, video production, digital marketing, graphic design, and UI/UX design.",
  keywords: [
    "digital agency",
    "web development",
    "video production",
    "digital marketing",
    "graphic design",
    "UI/UX design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050508] text-white">
        {children}
      </body>
    </html>
  );
}
