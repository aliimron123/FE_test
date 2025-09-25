"use client";

import React, { useMemo } from "react";
import { TrafficRow } from "@/types/traffic.type";
import PieChartComponent from "./chart/pie-chart";

const chartColor = ["#facc15", "#60a5fa", "#8b5cf6"];

interface BranchProps {
  data: TrafficRow[];
}

function BranchChart({ data }: BranchProps) {
  const dataChart = useMemo(() => {
    if (!data || data.length === 0) return [];

    // hitung total lalin per cabang
    const totalPerCabang = data.reduce(
      (acc, curr) => {
        const totalLalin =
          curr.Tunai +
          curr.DinasOpr +
          curr.DinasMitra +
          curr.DinasKary +
          curr.eMandiri +
          curr.eBri +
          curr.eBni +
          curr.eBca +
          curr.eNobu +
          curr.eDKI +
          curr.eMega +
          curr.eFlo;

        if (!acc[curr.IdCabang]) {
          acc[curr.IdCabang] = 0;
        }
        acc[curr.IdCabang] += totalLalin;

        return acc;
      },
      {} as Record<number, number>
    );

    // ubah menjadi array untuk chart
    return Object.entries(totalPerCabang).map(([idCabang, total]) => ({
      name: `Cabang ${idCabang}`,
      value: total,
    }));
  }, [data]);

  return (
    <div className="relative flex w-full max-w-md flex-col items-center justify-center rounded-md border border-gray-100 bg-white p-2 drop-shadow-md">
      <PieChartComponent data={dataChart} color={chartColor} />

      <div className="absolute bottom-2">
        {dataChart.map((item, index) => (
          <div key={index} className="flex gap-2">
            <div
              className="my-auto h-4 w-4 rounded-full"
              style={{ backgroundColor: chartColor[index % chartColor.length] }}
            />
            <p>{item.name}</p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BranchChart;
