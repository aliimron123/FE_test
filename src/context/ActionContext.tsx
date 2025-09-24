"use client";

import React, { createContext, useState, useMemo } from "react";

export interface ActionContextType {
  action: "open" | "edit" | "create" | "detail" | null;
  setAction: (value: "open" | "edit" | "create" | "detail" | null) => void;
}

const defaultValues: ActionContextType = {
  action: null,
  setAction: () => {},
};

export const ActionContext = createContext<ActionContextType>(defaultValues);

interface Props {
  children: React.ReactNode;
}

export const ActionProvider = ({ children }: Props) => {
  const [action, setAction] = useState<"open" | "edit" | "create" | "detail" | null>(null);

  const value = useMemo(() => ({ action, setAction }), [action]);

  return <ActionContext.Provider value={value}>{children}</ActionContext.Provider>;
};
