import React from "react";
import { ActionProvider } from "@/context/ActionContext";
import AuthProvider from "@/context/AuthContext";
import { SidebarProvider } from "@/context/CollpasedContext";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
  fontFamilyMonospace: "Roboto",
  headings: { fontFamily: "Roboto, sans-serif" },
});

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MantineProvider theme={theme}>
      <ActionProvider>
        <AuthProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </AuthProvider>
      </ActionProvider>
    </MantineProvider>
  );
}

export default Provider;
