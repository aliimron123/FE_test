"use client";

import { useContext } from "react";
import { ActionContext, ActionContextType } from "@/context/ActionContext";

// Hook untuk akses context
export function useActionContext(): ActionContextType {
  const ctx = useContext(ActionContext);
  if (ctx === undefined) {
    throw new Error("useAuth harus dipakai dalam AuthProvider");
  }
  return ctx;
}
