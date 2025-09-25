"use client";

import React, { useEffect, useState } from "react";
import { fetchTraffic } from "@/services/api/traffic.api";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { Button } from "@/components/ui";
import { useFilterTable } from "@/utils/hooks/use-filters-table";
import { TrafficRow } from "@/types/traffic.type";
import BranchChart from "./branch-chart";
import GateChart from "./gate-chart";
import PaymentChart from "./payment-chart";
import ShiftCart from "./shift-cart";

function DashView() {
  const [data, setData] = useState<TrafficRow[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setDate, date } = useFilterTable();

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const lalins = await fetchTraffic();
      setData(lalins);
    } catch (err: any) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="flex h-full w-full flex-col gap-3">
      <div className="w-full justify-between rounded-md bg-white p-4">
        <div className="bg-am mb-6 rounded-xl bg-gradient-to-r from-blue-100 to-blue-50 px-6 py-3 text-blue-900 shadow-md">
          <h1 className="mb-1 text-2xl font-semibold">Selamat datang, Di Dashboard Ini 👋</h1>
          <p className="text-sm text-blue-800/80">
            Semoga harimu menyenangkan! Lihat ringkasan trafik hari ini di bawah.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <DatePickerInput
            value={value}
            onChange={setValue}
            className="w-full max-w-48"
            placeholder="Select Date"
            rightSection={<IconCalendar />}
          />
          <Button onClick={() => setDate(value)}>Filter</Button>
        </div>
      </div>
      <div className="flex h-full w-full flex-1 gap-2">
        <div className="w-full">
          <PaymentChart data={data} />
        </div>
        <ShiftCart data={data} />
      </div>{" "}
      <div className="flex h-full w-full flex-1 gap-2">
        <div className="w-full">
          <GateChart data={data} />
        </div>
        <BranchChart data={data} />
      </div>
    </section>
  );
}

export default DashView;
