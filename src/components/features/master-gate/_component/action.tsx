"use client";

import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash, IconEye } from "@tabler/icons-react";
import { useQueryState } from "nuqs";
import { useFilterTable } from "@/utils/hooks/use-filters-table";
import { useActionContext } from "@/utils/hooks/useActionContext";
import { searchParams } from "@/utils/lib/searchparams";
import { GateRow } from "@/types/gate.type";

interface ActionButtonsProps {
  row: GateRow;
}
export default function ActionButtons({ row }: ActionButtonsProps) {
  const { setAction } = useActionContext();

  const { setSelectedId, setCabangId } = useFilterTable();

  const handleAction = (actionType: "detail" | "edit" | "delete") => {
    setAction(actionType);
    setSelectedId(String(row.id));
    setCabangId(String(row.IdCabang));
  };

  return (
    <Group className="flex items-center justify-center">
      {/* Detail */}
      <Tooltip label="Detail">
        <ActionIcon
          color="blue"
          variant="outline"
          onClick={() => handleAction("detail")}
          aria-label="Detail"
        >
          <IconEye style={{ width: "20px", height: "20px" }} stroke={1.5} />
        </ActionIcon>
      </Tooltip>

      {/* Edit */}
      <Tooltip label="Edit">
        <ActionIcon
          color="yellow"
          variant="outline"
          onClick={() => handleAction("edit")}
          aria-label="Edit"
        >
          <IconEdit style={{ width: "20px", height: "20px" }} stroke={1.5} />
        </ActionIcon>
      </Tooltip>

      {/* Delete */}
      <Tooltip label="Hapus">
        <ActionIcon
          color="red"
          variant="outline"
          onClick={() => handleAction("delete")}
          aria-label="Hapus"
        >
          <IconTrash style={{ width: "20px", height: "20px" }} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
