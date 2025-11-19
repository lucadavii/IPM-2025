import type { Metadata } from "next";
import "@/app/globals.css";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { ActivitiesSidebar } from "@/components/ui/activitiessidebar";


export const metadata: Metadata = {
  title: "Grow&Care | Browse Activities",
  description: "Grow&Care Activities Section",
};

export default function ActivitiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
        <ActivitiesSidebar />
        <main className="w-full">
            <SidebarTrigger />
            {children}
        </main>
    </SidebarProvider>
  );
}
