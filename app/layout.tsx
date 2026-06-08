import type { Metadata } from "next";
import { Geist, Geist_Mono, Bitcount_Single } from "next/font/google";
import "./globals.css";
import Stats from "./ui/stats";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bitcountSingle = Bitcount_Single({
  variable: "--font-bitcount-single",
  subsets: ["latin"],
  adjustFontFallback: false
})

export const metadata: Metadata = {
  title: "MegaSkins",
  description: "Minecraft skins database for the era of agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bitcountSingle.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}
        <footer>
          <div className="w-full max-w-3xl mx-auto py-8 px-4 text-center text-sm text-zinc-500">
            <p>
              &copy; {new Date().getFullYear()} MegaSkins. MIT Licence
            </p>
            <div className="grid h-32 grid-cols-1 place-content-center gap-2">
              <Stats></Stats>
              <p><a href="https://raw.githubusercontent.com/Onako2/MegaSkins-frontend/refs/heads/main/LICENCES.md">Open Source Notice</a></p>
              <p><a href="/privacy/">Contact</a></p>
              <p><a href="/privacy/">Privacy</a></p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
