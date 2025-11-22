import type { Metadata } from "next";
import "@/app/globals.css";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { ActivitiesSidebar } from "@/components/ui/activitiessidebar";
import { fetchActivityCategories, fetchGoals } from "@/lib/supabase";


export const metadata: Metadata = {
  title: "Grow&Care | Browse Activities",
  description: "Grow&Care Activities Section",
};

export default async function ActivitiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await fetchActivityCategories();
  const goals = await fetchGoals();

  return (
    <SidebarProvider>
        <ActivitiesSidebar categories={categories} goals={goals} />
        <main className="w-full">
            <SidebarTrigger />
            {children}
        </main>
    </SidebarProvider>
  );
}
