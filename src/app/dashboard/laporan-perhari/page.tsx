"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchTrafficReport } from "@/services/api/traffic.api";
import TrafficView from "@/components/features/traffic/traffic-view";
import { TrafficData, TrafficRow } from "@/types/traffic.type";

function Page() {
  const [data, setData] = useState<TrafficData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams();
  const limit = params.get("limit") ?? "10"; // default 10
  const page = params.get("page") ?? "1"; // default 1

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const lalins = await fetchTrafficReport({ page: page, limit: limit });
        setData(lalins);
      } catch (err: any) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [page, limit]);

  const dataTraffic: TrafficRow[] = data?.rows.rows ?? [];
  const totalData = data?.count ?? 0;
  const totalPage = data?.total_pages ?? 0;

  return (
    <TrafficView
      data={dataTraffic}
      loading={loading}
      error={error}
      totalItem={totalData}
      totalPage={totalPage}
    />
  );
}

export default Page;
