"use client";

import React, { useState } from "react";
import { updateGate } from "@/services/api/gate.api";
import { Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "sonner";
import { Button, Input } from "@/components/ui";

const randomId = Math.floor(Math.random() * 1000) + 1; // 1 - 1000
const randomIdCabang = Math.floor(Math.random() * 1000) + 100;

interface Props {
  handleClose: () => void;
}

function FormMasterEdit({ handleClose }: Props) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      NamaCabang: "",
      NamaGerbang: "",
    },
    validate: {
      NamaCabang: (value) => (value.length < 3 ? "Nama Cabang minimal 3 karakter" : null),
      NamaGerbang: (value) => (value.length < 3 ? "Nama Gerbang minimal 3 karakter" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const payload = {
        id: randomId,
        IdCabang: randomIdCabang, // contoh sementara
        NamaCabang: values.NamaCabang,
        NamaGerbang: values.NamaGerbang,
      };

      const createdGate = await updateGate(payload);
      toast.success("Gate berhasil dibuat:", createdGate);
      if (createdGate) {
        form.reset();
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(`Gagal membuat gate: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-2.5" onSubmit={form.onSubmit(handleSubmit)}>
      <Input
        label="Nama Cabang"
        placeholder="Masukkan Nama Cabang"
        {...form.getInputProps("NamaCabang")}
        classNames={{
          input: "rounded-xl border-gray-300 text-sm focus:ring-1 focus:ring-blue-400",
          label: "text-gray-700 text-sm font-medium",
        }}
      />

      <Input
        label="Nama Gerbang"
        placeholder="Masukkan Nama Gerbang"
        {...form.getInputProps("NamaGerbang")}
        classNames={{
          input: "rounded-xl border-gray-300 text-sm focus:ring-1 focus:ring-blue-400",
          label: "text-gray-700 text-sm font-medium",
        }}
      />

      <Divider />

      <div className="mt-2 flex justify-end gap-2">
        <Button
          type="button"
          variant="default"
          disabled={loading}
          onClick={() => {
            form.reset();
            handleClose();
          }}
        >
          Batal
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Simpan"}
        </Button>
      </div>
    </form>
  );
}

export default FormMasterEdit;
