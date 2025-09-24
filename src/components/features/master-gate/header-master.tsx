"use client";

import React from "react";
import { Button } from "@/components/ui";
import { useActionContext } from "@/utils/hooks/useActionContext";
import { SearchFilter } from "./_component/search-filter";

function HeaderMaster() {
  const { setAction } = useActionContext();
  return (
    <div className="mb-4 flex justify-between">
      <SearchFilter />
      <Button onClick={() => setAction("create")}>open</Button>
    </div>
  );
}

export default HeaderMaster;
