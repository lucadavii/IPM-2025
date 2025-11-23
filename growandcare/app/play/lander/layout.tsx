"use client";

import type { ReactNode } from "react";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlayMode } from "@/components/play-mode-provider";

import "@/app/globals.css";
import Link from "next/link";
import {DoorOpenIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExitPlayModeButton } from "@/components/ui/exitplaymodebutton";


export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {isLocked} = usePlayMode();
  const router = useRouter();

  if( !isLocked ) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg font-medium">Play Mode is not active.</p>
          <Button variant={"default"} className="bg-green-600">
            <Link href="/play" className="flex items-center">
              Go to PIN setup Page
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
      <>
        <div className="relative flex justify-center items-center p-4 bg-green-200 border-b border-green-300">
            <Link href="/play">
                <span className="text-2xl font-bold">🎮 Play Mode 🎮</span>
            </Link>
            <div className="absolute right-0">
                <ExitPlayModeButton />
            </div>
        </div>
        {children}
      </>
    );
}
