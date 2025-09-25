"use client";

import { useState } from "react";
import { TextInput, Button, ActionIcon } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useFilterTable } from "@/utils/hooks/use-filters-table";

export function SearchFilter() {
  const { setSearchQuery } = useFilterTable();
  const [value, setValue] = useState(""); // local state untuk input

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // biar tidak reload
    setSearchQuery(value || null); // simpan ke query params lewat hook
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xs gap-2">
      <TextInput
        placeholder="Search gerbang..."
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        style={{ maxWidth: 500, width: 300 }}
        size="md"
      />
      <ActionIcon
        type="submit"
        variant="filled"
        color="blue"
        className="my-auto w-full"
        size={"input-sm"}
      >
        <IconSearch />
      </ActionIcon>
    </form>
  );
}
