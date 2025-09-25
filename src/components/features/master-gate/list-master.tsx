"use client";

// app/master-view/page.tsx (atau file server component)
import "@/services/api/gate.api";
import { DataTable, Column } from "@/components/ui/table/datatable";
import { GateRow } from "@/types/gate.type";
import ActionButtons from "./_component/action";

export const revalidate = 0; // no caching, selalu fetch terbaru

export default function MasterList({ data }: { data: GateRow[] }) {
  // Fetch data dari server

  const columns: Column<GateRow>[] = [
    { key: "NamaCabang", label: "Ruas", sortable: true },
    { key: "NamaGerbang", label: "Gerbang", sortable: true },
    {
      key: "action",
      label: "Aksi",
      render: (row) => <ActionButtons row={row} />,
    },
  ];

  return (
    <section>
      <DataTable data={data} columns={columns} stickyHeader showNo />
    </section>
  );
}
