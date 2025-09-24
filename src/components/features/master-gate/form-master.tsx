import React from "react";
import { Divider } from "@mantine/core";
import { Button, Input } from "@/components/ui";

function FormMaster() {
  return (
    <form className="flex flex-col gap-2.5">
      <Input
        label="Ruas"
        placeholder="Ruas"
        withAsterisk
        classNames={{
          input: "rounded-xl border-gray-300 text-sm focus:ring-1 focus:ring-blue-400", // input element
          label: "text-gray-700 text-sm font-medium ", // label element
        }}
      />{" "}
      <Input
        label="Gerbang"
        placeholder="Gerbang"
        classNames={{
          input: "rounded-xl border-gray-300 text-sm focus:ring-1 focus:ring-blue-400", // input element
          label: "text-gray-700 text-sm font-medium ", // label element
        }}
      />
      <Divider />
      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="default">
          Batal
        </Button>
        <Button type="submit">Simpan</Button>
      </div>
    </form>
  );
}

export default FormMaster;
