"use client";

import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/context/AuthContext";

// Hook untuk akses context
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth harus dipakai dalam AuthProvider");
  }
  return ctx;
}
