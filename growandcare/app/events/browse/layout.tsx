import type { Metadata } from "next";
import "@/app/globals.css";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { EventsSidebar } from "@/components/ui/eventssidebar";


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
        <EventsSidebar />
        <main className="w-full">
            <SidebarTrigger />
            {children}
        </main>
    </SidebarProvider>
  );
}
