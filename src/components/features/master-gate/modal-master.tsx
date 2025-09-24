"use client";

import React from "react";
import { Modal } from "@mantine/core";
import { useActionContext } from "@/utils/hooks/useActionContext";
import FormMaster from "./form-master";

function ModalMaster() {
  const { setAction, action } = useActionContext();
  return (
    <div>
      <Modal
        opened={action === "create"}
        onClose={() => setAction(null)}
        title={"Tambah Gerbang"}
        centered
      >
        <FormMaster />
      </Modal>
    </div>
  );
}

export default ModalMaster;
