"use client";

import React, { createContext, useState } from "react";

type SidebarContextType = {
  collapsed: boolean;
  toggle: () => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed((c) => !c);

  return (
    <SidebarContext.Provider value={{ collapsed, toggle }}>{children}</SidebarContext.Provider>
  );
};
