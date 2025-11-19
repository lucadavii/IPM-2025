import type { Metadata } from "next";
import "@/app/globals.css";
import Link from "next/link";
import {DoorOpenIcon} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Grow&Care",
  description: "Grow&Care | Play Mode",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <div className="relative flex justify-center items-center p-4 bg-green-200 border-b border-green-300">
            <Link href="/play">
                <span className="text-2xl font-bold">🎮 Play Mode 🎮</span>
            </Link>
            <Link href="/" className="absolute right-0">
                <Button variant="outline" className="mr-2 rounded-md bg-transparent border-transparent hover:bg-green-100">
                    <DoorOpenIcon className="inline-block w-4 h-4" />
                </Button>
            </Link>
        </div>
        {children}
      </>
    );
}
