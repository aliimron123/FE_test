"use client";

import { TextInput } from "@mantine/core";
import { useFilterTable } from "@/utils/hooks/use-filters-table";

export function SearchFilter() {
  const { searchQuery, setSearchQuery } = useFilterTable();

  return (
    <div className="flex gap-2">
      <TextInput
        placeholder="Search gerbang..."
        value={searchQuery || ""}
        onChange={(event) => setSearchQuery(event.currentTarget.value || null)}
        style={{ maxWidth: 300 }}
      />
    </div>
  );
}
