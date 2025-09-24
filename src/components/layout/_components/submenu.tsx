"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@mantine/core";

interface SubmenuProps {
  label: string;
  icon?: React.ReactNode;
  href: string;
}

const Submenu: React.FC<SubmenuProps> = ({ label, icon, href }) => {
  const pathname = usePathname();
  return (
    <NavLink
      component={Link}
      href={href}
      label={label}
      leftSection={icon}
      active={pathname === href}
      styles={(theme) => ({
        root: {
          borderRadius: theme.radius.sm,
          "&[dataActive]": {
            backgroundColor: theme.colors.blue[1],
          },
        },
      })}
    />
  );
};

export default Submenu;
