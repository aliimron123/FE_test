"use client";

import { useContext } from "react";
import { SidebarContext } from "@/context/CollpasedContext";

export const useSidebarCollapse = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebarCollapse must be used within SidebarProvider");
  }
  return ctx;
};
