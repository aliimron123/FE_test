import React, { useState } from "react";
import { deleteGate } from "@/services/api/gate.api";
import { Text, Button } from "@mantine/core";
import { toast } from "sonner";
import { useFilterTable } from "@/utils/hooks/use-filters-table";

interface Props {
  handleClose: () => void;
}

function DeleteDialogMaster({ handleClose }: Props) {
  const [loading, setLoading] = useState(false);
  const { selectedId, cabangId } = useFilterTable();

  const handleDelete = async () => {
    if (!selectedId || !cabangId) return;
    setLoading(true);
    try {
      await deleteGate(Number(selectedId), Number(cabangId));
      handleClose();
      toast.success("Gate berhasil dihapus");
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Gagal menghapus gate");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Text>Apakah Anda yakin ingin menghapus ruas ini?</Text>
      <div className="flex justify-end gap-1">
        <Button variant="outline" disabled={loading} onClick={handleClose}>
          Batal
        </Button>
        <Button color="red" onClick={handleDelete} disabled={loading} loading={loading}>
          Ya, Hapus
        </Button>
      </div>
    </div>
  );
}

export default DeleteDialogMaster;
