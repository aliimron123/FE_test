import React from "react";
import { transaksiData } from "@/constants/data-chart";
import BarChartComponent from "./chart/bar-chart";

function PaymentChart() {
  const dataChart = transaksiData.flatMap((item) => [
    { name: "Tunai", value: item.Tunai },
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
