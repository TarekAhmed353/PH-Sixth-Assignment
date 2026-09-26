import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description:
    "A dark, no-nonsense gym companion. Pick a lift, lock it into today's plan, and log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="fitlog"
      className={`${inter.variable} ${oswald.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-base-100 text-base-content font-sans antialiased">
        <PlanProvider>
          <Navbar />
          {children}
        </PlanProvider>
      </body>
    </html>
  );
}