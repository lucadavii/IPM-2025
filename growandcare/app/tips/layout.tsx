import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { NavMenu } from "@/components/ui/navmenu";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { TipsSidebar } from "@/components/ui/tipsidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grow&Care",
  description: "Grow&Care",
};

export default function TipsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
            <TipsSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
      </body>
  );
}
