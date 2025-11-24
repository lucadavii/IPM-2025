import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavMenu } from "@/components/ui/navmenu";

export const metadata: Metadata = {
  title: "Grow&Care",
  description: "Grow&Care",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <NavMenu />
        {children}
      </>
    );
}
