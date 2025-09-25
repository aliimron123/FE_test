"use client";

import React, { useState } from "react";
import { SegmentedControl } from "@mantine/core";
import { DataTableSkeleton } from "@/components/ui/table/skeleton-table";
import { useFilterTable } from "@/utils/hooks/use-filters-table";
import { TrafficRow } from "@/types/traffic.type";
import FilterHead from "./filter-head";
import TrafficTable from "./table/traffic-table";

interface Props {
  data: TrafficRow[];
  loading: boolean;
  isError?: boolean;
  error?: string | null;
  totalPage: number;
  totalItem: number;
}

const allMethods = [
  "Tunai",
  "DinasOpr",
  "DinasMitra",
  "DinasKary",
  "eMandiri",
  "eBri",
  "eBni",
  "eBca",
  "eNobu",
  "eDKI",
  "eMega",
  "eFlo",
];

const EtollMethod = ["eMandiri", "eBri", "eBni", "eBca", "eNobu", "eDKI", "eMega", "eFlo"];

const KTPMethod = ["DinasOpr", "DinasMitra", "DinasKary"];

const TrafficView = ({ data, loading, isError, error, totalItem, totalPage }: Props) => {
  const [valueSegmented, setValueSegmented] = useState("satu");
  const { searchQuery } = useFilterTable();

  const q = searchQuery?.trim().toLowerCase();

  const filteredData = !q
    ? data
    : data.filter((item) => {
        const idGerbang = String(item.IdGerbang);
        const idCabang = String(item.IdCabang);
        const idGardu = String(item.IdGardu);
        return idGerbang.includes(q) || idGardu.includes(q) || idCabang.includes(q);
      });

  return (
    <div className="space-y-2">
      <div className="py-2">
        <FilterHead />
      </div>

      <div className="rounded-md bg-white p-2">
        <SegmentedControl
          value={valueSegmented}
          color="#073763"
          onChange={setValueSegmented}
          data={[
            { label: "Total Tunai", value: "satu" },
            { label: "Total E-Tol", value: "dua" },
            { label: "Total Flo", value: "tiga" },
            { label: "Total KTP", value: "empat" },
            { label: "Total Keseluruhan", value: "lima" },
          ]}
        />

        {loading ? (
          <DataTableSkeleton columnCount={5} rowCount={8} />
        ) : (
          <div style={{ marginTop: 20 }}>
            {valueSegmented === "satu" && (
              <TrafficTable
                data={filteredData}
                totalItem={totalItem}
                paymentTitle="Tunai"
                paymentMethods={["Tunai"]}
              />
            )}
            {valueSegmented === "dua" && (
              <TrafficTable
                data={filteredData}
                totalItem={totalItem}
                paymentTitle="E-Toll"
                paymentMethods={EtollMethod}
              />
            )}
            {valueSegmented === "tiga" && (
              <TrafficTable
                data={filteredData}
                totalItem={totalItem}
                paymentTitle="E-Flo"
                paymentMethods={["eFlo"] as const}
              />
            )}
            {valueSegmented === "empat" && (
              <TrafficTable
                data={filteredData}
                totalItem={totalItem}
                paymentTitle="KTP"
                paymentMethods={KTPMethod}
              />
            )}
            {valueSegmented === "lima" && (
              <TrafficTable
                data={filteredData}
                totalItem={totalItem}
                paymentTitle="Keseluruhan"
                paymentMethods={allMethods}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrafficView;
