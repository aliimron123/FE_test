import React from "react";
import ChildLayout from "@/components/layout/layout-component";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ChildLayout>{children}</ChildLayout>;
}

export default DashboardLayout;
