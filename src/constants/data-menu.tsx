import { IconLayoutSidebar, IconReportAnalytics, IconSettings } from "@tabler/icons-react";
import { MenuItem } from "@/types/layout.type";

export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <IconLayoutSidebar size={18} />,
  },
  {
    label: "Laporan Lalin",
    href: "/dashboard/laporan-perhari",
    icon: <IconReportAnalytics size={18} />,
    subMenu: [{ label: "Laporan Per Hari", href: "/dashboard/laporan-perhari" }],
  },
  {
    label: "Master Gerbang",
    href: "/dashboard/master-gerbang",
    icon: <IconSettings size={18} />,
  },
];
