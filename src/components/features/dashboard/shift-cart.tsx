import React from "react";
import { TrafficRow } from "@/types/traffic.type";
import PieChartComponent from "./chart/pie-chart";

const chartColor = ["#facc15", "	#000042", "#8b5cf6"];
interface ShiftCartProps {
  data: TrafficRow[];
}

function ShiftCart({ data }: ShiftCartProps) {
  // hitung total lalin per shift dulu
  const totalPerShift = data.reduce(
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

      if (!acc[curr.Shift]) {
        acc[curr.Shift] = 0;
      }
      acc[curr.Shift] += totalLalin;

      return acc;
    },
    {} as Record<number, number>
  );

  // ubah jadi array untuk chart
  const dataChart = Object.entries(totalPerShift).map(([shift, total]) => ({
    name: `Shift ${shift}`,
    value: total,
  }));

  return (
    <div className="relative flex w-full max-w-md flex-col items-center justify-center rounded-md border border-gray-100 bg-white p-2 drop-shadow-md">
      <PieChartComponent data={dataChart} color={chartColor} />

      <div className="absolute bottom-2">
        {dataChart.map((item, index) => (
          <div key={index} className="flex gap-2">
            <div
              className={`my-auto h-4 w-4 rounded-full`}
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

export default ShiftCart;
