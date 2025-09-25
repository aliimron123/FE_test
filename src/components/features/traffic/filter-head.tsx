import React from "react";
import { Button } from "@/components/ui";
import { SearchFilter } from "../master-gate/_component/search-filter";

function FilterHead() {
  return (
    <div className="flex w-full justify-between">
      <div>
        <SearchFilter />
      </div>
      <Button variant="filled" color="blue">
        Cari
      </Button>
    </div>
  );
}

export default FilterHead;
