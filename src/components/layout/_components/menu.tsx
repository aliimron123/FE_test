"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "@/constants/data-menu";
import { NavLink, Box } from "@mantine/core";
import { useSidebarCollapse } from "@/utils/hooks/useSidebarContext";
import Submenu from "./submenu";

export default function SidebarMenu() {
  const pathname = usePathname();
  const { collapsed } = useSidebarCollapse();

  return (
    <Box>
      {menuItems.map((item) =>
        item.subMenu ? (
          <NavLink
            key={item.label}
            label={!collapsed && item.label}
            leftSection={item.icon}
            defaultOpened={item.subMenu.some((sm) => pathname === sm.href)}
            active={item.subMenu.some((sm) => pathname === sm.href)}
            styles={(theme) => ({
              root: {
                borderRadius: theme.radius.sm,
                width: collapsed ? "42px" : undefined,
                margin: collapsed ? "auto" : undefined,
                "&[dataActive]": {
                  backgroundColor: theme.colors.blue[6],
                },
              },
            })}
          >
            {!collapsed && (
              <>
                {item.subMenu.map((sub) => (
                  <Submenu key={sub.label} label={sub.label} icon={sub.icon} href={sub.href} />
                ))}
              </>
            )}
          </NavLink>
        ) : (
          <NavLink
            key={item.label}
            component={Link}
            href={item.href!}
            label={!collapsed && item.label}
            leftSection={item.icon}
            active={pathname === item.href}
            styles={(theme) => ({
              root: {
                borderRadius: theme.radius.sm,
                width: collapsed ? "42px" : undefined,
                margin: collapsed ? "auto" : undefined,
                "&[dataActive]": {
                  backgroundColor: theme.colors.blue[6],
                },
              },
            })}
          />
        )
      )}
    </Box>
  );
}
