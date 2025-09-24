"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChevronRight } from "@tabler/icons-react";

export default function AppBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);

    return { href, label };
  });

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm">
        {crumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center space-x-1">
            {index > 0 && <IconChevronRight size={14} className="text-gray-300" />}
            {index === crumbs.length - 1 ? (
              <span className="font-medium text-white">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-gray-200 transition-colors hover:text-blue-600"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
