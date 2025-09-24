"use client";

import React from "react";
import Image from "next/image";
import { Divider } from "@mantine/core";
import SidebarMenu from "./_components/menu";

function SideNav() {
  return (
    <div className="sticky top-0 left-0 flex h-screen w-full flex-col gap-2 overflow-x-hidden overflow-y-auto bg-white px-2 pt-2">
      <div className="flex gap-2">
        <Image
          src={"/assets/logo-jasamarga.png"}
          width={800}
          height={800}
          className="h-14 w-14"
          alt="logo"
          loading="eager"
        />
        <div className="my-auto flex flex-col">
          <h2 className="font-semibold text-blue-900">Jasamarga</h2>
          <p className="text-xs">Dashboard</p>
        </div>
      </div>
      <Divider />
      <div className="h-full w-full pt-4">
        <SidebarMenu />
      </div>
    </div>
  );
}

export default SideNav;
