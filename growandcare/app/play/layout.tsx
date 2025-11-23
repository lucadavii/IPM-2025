"use client";

import type { ReactNode } from "react";
import { PlayModeProvider } from "@/components/play-mode-provider";

export default function PlayLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <PlayModeProvider>
      {children}
    </PlayModeProvider>
  );
}