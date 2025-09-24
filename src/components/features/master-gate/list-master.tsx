// app/master-view/page.tsx (atau file server component)
import { getGates } from "@/services/api/gate.api";
import { DataTable, Column } from "@/components/ui/table/datatable";
import { GateResponse, GateRow } from "@/types/gate.type";

export const revalidate = 0; // no caching, selalu fetch terbaru

export default async function MasterList() {
  // Fetch data dari server
  let gates: GateRow[] = [];
  try {
    const response: GateResponse = await getGates(); // page 1, limit 10
    gates = response.data.rows.rows || [];
  } catch (error) {
    console.error("Failed to fetch gates:", error);
  }

  const columns: Column<GateRow>[] = [
    { key: "NamaGerbang", label: "Gerbang" },
    { key: "NamaCabang", label: "Cabang" },
  ];

  return (
    <section>
      <DataTable data={gates} columns={columns} stickyHeader showNo />
    </section>
  );
}
