"use client";

import { useState } from "react";
import { Table } from "@mantine/core";
import { IconArrowsUpDown, IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { parseAsInteger, useQueryState } from "nuqs";
import PaginationTable from "./pagination-table";

export type Column<T> = {
  key: keyof T | "action"; // tambahkan "action" untuk kolom khusus
  label: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  minWidth?: string | number;
  maxWidth?: string | number;
};

type DataTableProps<T extends { id: number }> = {
  data: T[];
  columns: Column<T>[];
  pageSizeOptions?: number[];
  initialPageSize?: number;
  stickyHeader?: boolean;
  align?: "left" | "center" | "right";
  showNo?: boolean;
};

export function DataTable<T extends { id: number }>({
  data,
  columns,
  pageSizeOptions = [5, 10, 20],
  initialPageSize = 5,
  stickyHeader = false,
  align = "left",
  showNo = false,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withOptions({ shallow: false }).withDefault(1)
  );
  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger.withOptions({ shallow: false, history: "push" }).withDefault(initialPageSize)
  );
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const getAlignmentClass = () => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const sortedData = [...data];
  if (sortKey) {
    sortedData.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }

  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable || col.key === "action") return;
    if (sortKey === col.key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      if (sortOrder === "desc") setSortKey(null);
    } else {
      setSortKey(col.key as keyof T);
      setSortOrder("asc");
    }
  };

  return (
    <div className="max-h-[600px] bg-white p-2">
      <div className="element-with-scrollbar max-h-[500px] table-fixed">
        <Table striped>
          <thead className={stickyHeader ? "sticky top-0 z-10 bg-slate-200" : "bg-slate-200"}>
            <tr>
              {showNo && <th className={`px-2 py-4 font-semibold ${getAlignmentClass()}`}>No</th>}
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`cursor-pointer px-2 py-4 font-semibold ${getAlignmentClass()}`}
                  onClick={() => handleSort(col)}
                  style={{ minWidth: col.minWidth, maxWidth: col.maxWidth }}
                >
                  <div className="flex gap-2">
                    {col.label}
                    {col.sortable && sortKey === col.key ? (
                      sortOrder === "asc" ? (
                        <IconSortAscending size={14} className="my-auto" />
                      ) : (
                        <IconSortDescending size={14} className="my-auto" />
                      )
                    ) : col.sortable && sortKey !== col.key ? (
                      <IconArrowsUpDown size={14} className="my-auto" />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onMouseEnter={() => setHoveredId(rowIndex)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {showNo && (
                  <td
                    className={`p-2 ${getAlignmentClass()} ${hoveredId === rowIndex ? "bg-slate-100" : ""}`}
                  >
                    {(currentPage - 1) * pageSize + rowIndex + 1}
                  </td>
                )}
                {columns.map((col, idx) => (
                  <td
                    key={idx}
                    className={`p-2 ${getAlignmentClass()} ${hoveredId === rowIndex ? "bg-slate-100" : ""}`}
                    style={{ minWidth: col.minWidth, maxWidth: col.maxWidth }}
                  >
                    {col.render
                      ? col.render(row)
                      : col.key === "action"
                        ? null
                        : (row[col.key as keyof T] as unknown as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <PaginationTable
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={data.length}
        pageSizeOptions={pageSizeOptions}
        onPageChange={setCurrentPage}
        onPageSizeChange={(value) => {
          setPageSize(Number(value));
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
