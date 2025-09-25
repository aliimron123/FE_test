"use client";

import React from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import PaginationTable from "@/components/ui/table/pagination-table";
import { getDate, getDay } from "@/utils/lib/getDate";
import { TrafficTransactionType } from "@/types/traffic.type";

type DataTableProps = {
  data: TrafficTransactionType[];
  pageSizeOptions?: number[];
  initialPageSize?: number;
  totalItem?: number;
  totalPage?: number;
};

const CashTable = ({
  data,
  pageSizeOptions = [10, 20, 50],
  initialPageSize = 10,
  totalItem,
  totalPage,
}: DataTableProps) => {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withOptions({ shallow: false }).withDefault(1)
  );
  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger.withOptions({ shallow: false, history: "push" }).withDefault(initialPageSize)
  );

  // ambil semua golongan unik
  const uniqueGolongan: number[] = Array.from(new Set(data.map((val) => val.Golongan)));

  // pagination
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data;

  // total per golongan
  const totalPerGolongan: Record<number, number> = {};
  uniqueGolongan.forEach((gol) => {
    totalPerGolongan[gol] = data
      .filter((item) => item.Golongan === gol)
      .reduce((sum, item) => sum + item.Tunai, 0);
  });

  const totalLalinAll = Object.values(totalPerGolongan).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white">
      <div className="h-full w-full overflow-hidden bg-white shadow-lg">
        <div className="h-full overflow-auto">
          <table className="h-full w-full">
            <thead>
              <tr className="bg-gray-200 text-sm text-gray-700">
                <th className="border-gray-300 px-4 py-3 text-left">No.</th>
                <th className="border-gray-300 px-4 py-3 text-left">Ruas</th>
                <th className="border-gray-300 px-4 py-3 text-left">Gerbang</th>
                <th className="border-gray-300 px-4 py-3 text-left">Gardu</th>
                <th className="border-gray-300 px-4 py-3 text-left">Hari</th>
                <th className="border-gray-300 px-4 py-3 text-left">Tanggal</th>
                <th className="border-gray-300 px-4 py-3 text-left">Shift</th>
                <th className="border-gray-300 px-4 py-3 text-left">Metode Pembayaran</th>
                {uniqueGolongan.map((val, indexTh) => (
                  <th className="border-gray-300 px-4 py-3 text-center" key={indexTh}>
                    Gol {val}
                  </th>
                ))}
                <th className="px-4 py-3 text-center">Total Lalin</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="border-gray-200 px-4 py-3 text-sm">{startIndex + index + 1}</td>
                  <td className="border-gray-200 px-4 py-3 text-sm">{item.IdCabang}</td>
                  <td className="border-gray-200 px-4 py-3 text-sm">{item.IdGerbang}</td>
                  <td className="border-gray-200 px-4 py-3 text-sm">{item.IdGardu}</td>
                  <td className="border-gray-200 px-4 py-3 text-sm">{getDay(item.Tanggal)}</td>
                  <td className="border-gray-200 px-4 py-3 text-sm">{getDate(item.Tanggal)}</td>
                  <td className="border-gray-200 px-4 py-3 text-sm">{item.Shift}</td>
                  <td className="border-gray-200 px-4 py-3 text-sm">Tunai</td>

                  {uniqueGolongan.map((gol, i) => (
                    <td className="border-gray-200 px-4 py-3 text-center text-sm" key={i}>
                      {item.Golongan === gol ? item.Tunai : 0}
                    </td>
                  ))}

                  <td className="px-4 py-3 text-center text-sm font-medium">{item.Tunai}</td>
                </tr>
              ))}

              {/* Row total */}
              <tr className="border-t border-gray-400 bg-gray-200">
                <td className="border-gray-200 px-4 py-3 text-sm font-bold" colSpan={8}>
                  Total Semua Lalin
                </td>
                {uniqueGolongan.map((gol, i) => (
                  <td className="border-gray-200 px-4 py-3 text-center text-sm font-bold" key={i}>
                    {totalPerGolongan[gol]}
                  </td>
                ))}
                <td className="px-4 py-3 text-center text-sm font-bold">{totalLalinAll}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <PaginationTable
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItem ?? data.length}
        pageSizeOptions={pageSizeOptions}
        totalPage={totalPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={(value) => {
          setPageSize(Number(value));
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default CashTable;
