"use client";

import React from "react";
import { Pagination, Select } from "@mantine/core";

type PaginationTableProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function PaginationTable({
  currentPage,
  pageSize,
  totalItems,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: PaginationTableProps) {
  return (
    <div className="flex flex-row-reverse items-center justify-start gap-8 border-t border-t-gray-300 px-4 pt-6 pb-2 drop-shadow-2xl">
      <Pagination
        value={currentPage}
        onChange={onPageChange}
        total={Math.ceil(totalItems / pageSize)}
      />
      <div className="flex gap-2">
        <p className="my-auto text-sm font-medium">Show :</p>
        <Select
          className="w-24"
          value={pageSize.toString()}
          onChange={(value) => {
            if (!value) return;
            onPageSizeChange(Number(value));
          }}
          data={pageSizeOptions.map((n) => n.toString())}
        />
        <p className="my-auto text-sm font-medium">entries</p>
      </div>
    </div>
  );
}
