"use client";

import React from "react";
import { useSidebarCollapse } from "@/utils/hooks/useSidebarContext";
import SideNav from "./side-nav";
import TopNav from "./top-nav";

export default function ChildLayout({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebarCollapse();
  return (
    <div className="flex h-screen w-full">
      <div
        className={`sticky top-0 h-screen overflow-y-auto border-r border-gray-200 drop-shadow-xl transition-[width,margin] duration-200 ease-in-out ${collapsed ? "w-18" : "w-[15%]"}`}
      >
        <SideNav />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-50 w-full">
          <TopNav />
        </div>

        <div className="flex-1 overflow-y-auto bg-[#dddddd] p-4">{children}</div>
      </div>
    </div>
  );
}
