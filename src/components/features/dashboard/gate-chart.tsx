"use client";

import React, { useMemo } from "react";
import { TrafficRow } from "@/types/traffic.type";
import BarChartComponent from "./chart/bar-chart";

interface PaymentChartProps {
  data: TrafficRow[];
}

function PaymentChart({ data }: PaymentChartProps) {
  const populateData = useMemo(() => {
    const acc = data.reduce(
      (sum, row) => {
        const key = row.IdAsalGerbang;

        if (!sum[key]) {
          sum[key] = { name: `Gerbang ${key}`, value: 0 };
        }

        // jumlahkan semua jenis pembayaran
        sum[key].value +=
          row.Tunai +
          row.DinasOpr +
          row.DinasMitra +
          row.DinasKary +
          row.eMandiri +
          row.eBri +
          row.eBni +
          row.eBca +
          row.eNobu +
          row.eDKI +
          row.eMega +
          row.eFlo;

        return sum;
      },
      {} as Record<number, { name: string; value: number }>
    );

    return Object.values(acc);
  }, [data]);

  return (
    <div className="h-full w-full rounded-md border border-gray-100 bg-white p-2 drop-shadow-md">
      <BarChartComponent data={populateData} />
    </div>
  );
}

export default PaymentChart;
