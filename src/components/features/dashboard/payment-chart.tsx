import React from "react";
import { TrafficRow } from "@/types/traffic.type";
import BarChartComponent from "./chart/bar-chart";

interface PaymentChartProps {
  data: TrafficRow[];
}

function PaymentChart({ data }: PaymentChartProps) {
  const dataChart = data.flatMap((item) => [
    { name: "Tunai", value: item.Tunai },
    { name: "Dinas Opr", value: item.DinasOpr },
    { name: "Dinas Mitra", value: item.DinasMitra },
    { name: "Dinas Kary", value: item.DinasKary },
    { name: "Mandiri", value: item.eMandiri },
    { name: "BRI", value: item.eBri },
    { name: "BNI", value: item.eBni },
    { name: "BCA", value: item.eBca },
    { name: "Nobu", value: item.eNobu },
    { name: "DKI", value: item.eDKI },
    { name: "Mega", value: item.eMega },
    { name: "Flo", value: item.eFlo },
  ]);

  const populateData = Object.values(
    dataChart.reduce(
      (acc, curr) => {
        if (!acc[curr.name]) {
          acc[curr.name] = { name: curr.name, value: 0 };
        }
        acc[curr.name].value += curr.value;
        return acc;
      },
      {} as Record<string, { name: string; value: number }>
    )
  );

  return (
    <div className="h-full w-full rounded-md border border-gray-100 bg-white p-2 drop-shadow-md">
      <BarChartComponent data={populateData} />
    </div>
  );
}

export default PaymentChart;
