"use client";

import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { ThemeId } from "@/app/token-data";

export const ThemeContext = createContext<{ theme: ThemeId; setTheme: Dispatch<SetStateAction<ThemeId>> } | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within AppShell");
  return ctx;
}
