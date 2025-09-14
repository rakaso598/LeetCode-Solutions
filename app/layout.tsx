import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationHeader } from "@/components/navigation-header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LeetCode Solutions",
  description: "A comprehensive collection of LeetCode problem solutions with detailed explanations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <NavigationHeader />
        <main className="min-h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}
