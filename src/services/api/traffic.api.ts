// services/traffic.ts
import { TrafficData, TrafficResponse, TrafficRow } from "@/types/traffic.type";

export async function fetchTraffic(tanggal?: string): Promise<TrafficRow[]> {
  try {
    const params = new URLSearchParams();
    if (tanggal) {
      params.append("tanggal", tanggal || new Date().toISOString().split("T")[0]);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}lalins?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch traffic, status: ${res.status}`);
    }

    const result: TrafficResponse = await res.json();

    if (!result.status) {
      throw new Error(result.message || "Failed to fetch traffic data");
    }

    return result.data.rows.rows || [];
  } catch (error: any) {
    console.error("Error fetching traffic:", error);
    throw error;
  }
}

export async function fetchTrafficReport({
  tanggal = "",
  page = "1",
  limit = "10",
}: {
  tanggal?: string;
  page?: string;
  limit?: string;
}): Promise<TrafficData> {
  try {
    // Buat query params
    const params = new URLSearchParams({
      tanggal,
      page: page,
      limit: limit,
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}lalins?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // selalu fresh di Next.js
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch traffic, status: ${res.status}`);
    }

    const result: TrafficResponse = await res.json();

    if (!result.status) {
      throw new Error(result.message || "Failed to fetch traffic data");
    }

    return result.data;
  } catch (error: any) {
    console.error("Error fetching traffic:", error);
    throw error;
  }
}
