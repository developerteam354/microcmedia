import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
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
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f7f4] text-[#1a1a1a]">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}