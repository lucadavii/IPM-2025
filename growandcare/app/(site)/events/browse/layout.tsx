import type { Metadata } from "next";
import "@/app/globals.css";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { EventsSidebar } from "@/components/ui/eventssidebar";

import { fetchGoals } from "@/lib/activity-connector";
import { fetchEventTags } from "@/lib/event-connector";


export const metadata: Metadata = {
  title: "Grow&Care | Browse Events",
  description: "Grow&Care Events Section",
};

export default async function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const goals = await fetchGoals();
  const tags = await fetchEventTags();
  return (
    <SidebarProvider>
        <EventsSidebar goals={goals} tags={tags} />
        <main className="w-full">
            <SidebarTrigger />
            {children}
        </main>
    </SidebarProvider>
  );
}
