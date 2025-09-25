import { searchParamsCache } from "@/utils/lib/searchparams";
import { GateResponse, GateRow } from "@/types/gate.type";

// ssr
export async function getGates(): Promise<GateResponse> {
  const search = searchParamsCache.get("q");
  const params = new URLSearchParams();
  if (search) {
    params.append("NamaGerbang", search);
  }
  const endpoint_url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}gerbangs?${params.toString()}`;
  console.log("[DEBUG] Fetching URL:", endpoint_url);
  try {
    const res = await fetch(endpoint_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch gates, status: ${res.status}`);
    }

    const data: GateResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching gates:", error);
    throw error;
  }
}

// crs get gate

export async function getGatesDetail(cabangId: string, gerbangId: string): Promise<GateResponse> {
  const params = new URLSearchParams();

  if (cabangId !== undefined) {
    params.append("IdCabang", String(cabangId));
  }

  if (gerbangId !== undefined) {
    params.append("id", String(gerbangId));
  }

  const endpoint_url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}gerbangs?${params.toString()}`;
  console.log("[DEBUG CSR] Fetching URL:", endpoint_url);

  try {
    const res = await fetch(endpoint_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch gates, status: ${res.status}`);
    }

    const data: GateResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching gates (CSR):", error);
    throw error;
  }
}

// CREATE gerbang
export async function createGate(payload: {
  IdCabang: number;
  NamaGerbang: string;
}): Promise<GateRow> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}gerbangs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to create gate: ${res.status}`);
  }

  const data: GateResponse = await res.json();
  return data.data.rows.rows[0];
}

// UPDATE gerbang
export async function updateGate(payload: GateRow): Promise<GateRow> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}gerbangs`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to update gate: ${res.status}`);
  }

  const data: GateResponse = await res.json();
  return data.data.rows.rows[0]; // asumsi response mengembalikan row yang diperbarui
}

// DELETE gerbang
export async function deleteGate(id: number, IdCabang: number): Promise<boolean> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}gerbangs/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, IdCabang }),
  });

  if (!res.ok) {
    throw new Error(`Failed to delete gate: ${res.status}`);
  }

  const data: GateResponse = await res.json();
  return data.status;
}
