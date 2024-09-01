import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "next 14 with typeScript",
  description: "created by mohammad saeedi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={` ${cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
      )}`}
      >
         <main>{children}</main> 
         <Toaster />
         <div className="bg-zinc-900 text-white text-center" >Thanks for your attention</div>
      </body>
    </html>
  );
}
