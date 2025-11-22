import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Radiant Zenith | Network Mastery",
  description: "Master Computer Networks with practice questions and summaries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} ${playfair.variable} bg-[#F9F7F2] text-[#2D2A26]`}>
        <div className="fixed inset-0 z-[-1] opacity-40 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
        <div className="h-full relative flex flex-col md:flex-row">
          <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
            <Sidebar />
          </div>
          <main className="flex-1 md:pl-72 pb-10 min-h-screen transition-all duration-500 ease-in-out">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
