import type { Metadata } from "next";
import "@/app/globals.css";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { TipsSidebar } from "@/components/ui/tipsidebar";


export const metadata: Metadata = {
  title: "Grow&Care | Tips",
  description: "Grow&Care Tips Section",
};

export default function TipsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
        <TipsSidebar />
        <main className="w-full">
            <SidebarTrigger />
            {children}
        </main>
    </SidebarProvider>
  );
}
