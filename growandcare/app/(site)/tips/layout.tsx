import type { Metadata } from "next";
import "@/app/globals.css";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { TipsSidebar } from "@/components/ui/tipsidebar";
import { fetchTipCategories } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Grow&Care | Tips",
  description: "Grow&Care Tips Section",
};

export default async function TipsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
        <TipsSidebar categories={await fetchTipCategories()} />
        <main className="w-full">
            <SidebarTrigger />
            {children}
        </main>
    </SidebarProvider>
  );
}
