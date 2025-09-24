import { searchParamsCache } from "@/utils/lib/searchparams";
import { GateResponse } from "@/types/gate.type";

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
