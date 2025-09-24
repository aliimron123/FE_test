import React from "react";
import { ActionIcon, Divider } from "@mantine/core";
import { IconLayoutSidebar } from "@tabler/icons-react";
import { useSidebarCollapse } from "@/utils/hooks/useSidebarContext";
import { Breadcrumb } from "../ui";
import ProfileButton from "./_components/profile-button";

function TopNav() {
  const { toggle } = useSidebarCollapse();
  return (
    <div className="top-0 z-50 flex h-fit w-full justify-between border-b bg-gray-800 px-4 py-3 shadow">
      <div className="my-auto flex gap-4">
        <ActionIcon size={32} variant="default" onClick={toggle}>
          <IconLayoutSidebar />
        </ActionIcon>
        <Divider orientation="vertical" />
        <div className="my-auto">
          <Breadcrumb />
        </div>
      </div>
      <ProfileButton />
    </div>
  );
}

export default TopNav;
