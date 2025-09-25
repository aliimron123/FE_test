import React, { useEffect, useState } from "react";
import { getGatesDetail } from "@/services/api/gate.api";
import { Divider } from "@mantine/core";
import { toast } from "sonner";
import { useFilterTable } from "@/utils/hooks/use-filters-table";
import { GateRow } from "./form-master";

interface Props {
  onClose: () => void;
}
function DetailMaster({ onClose }: Props) {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<GateRow[]>([]);
  const { selectedId, cabangId } = useFilterTable();

  useEffect(() => {
    setFetching(true);
    if (selectedId && cabangId) {
      getGatesDetail(cabangId as string, selectedId as string)
        .then((res: any) => setData(res.data.rows.rows))
        .catch((err: any) => toast.error(`Gagal fetch data: ${err.message}`))
        .finally(() => setFetching(false));
    }
  }, [cabangId, selectedId]);
  return (
    <div>
      <Divider className="my-3" />
      {data.map((val, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <p className="font-medium text-gray-700">Ruas :</p>
            <p>{val.NamaCabang}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-medium text-gray-700">Gerbang :</p>
            <p>{val.NamaGerbang}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DetailMaster;
