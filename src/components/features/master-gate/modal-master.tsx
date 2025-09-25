"use client";

import React from "react";
import { Modal } from "@mantine/core";
import { useFilterTable } from "@/utils/hooks/use-filters-table";
import { useActionContext } from "@/utils/hooks/useActionContext";
import DeleteDialogMaster from "./delete-data-master";
import DetailMaster from "./detail-master";
import FormMasterEdit from "./form-edit-master";
import FormMaster from "./form-master";

function ModalMaster() {
  const { setAction, action } = useActionContext();
  const { setCabangId, setSelectedId } = useFilterTable();

  const handleClose = () => {
    setAction(null);
    setCabangId(null);
    setSelectedId(null);
  };

  return (
    <div>
      <Modal
        opened={action === "create"}
        onClose={() => handleClose()}
        title={"Tambah Gerbang"}
        centered
        closeOnClickOutside={false}
      >
        <FormMaster handleClose={() => handleClose()} />
      </Modal>

      <Modal
        opened={action === "edit"}
        onClose={() => handleClose()}
        title={"Edit Gerbang"}
        centered
        closeOnClickOutside={false}
      >
        <FormMasterEdit handleClose={() => handleClose()} />
      </Modal>
      <Modal
        opened={action === "detail"}
        onClose={() => handleClose()}
        title={"Detail Informasi Gerbang"}
        centered
      >
        <DetailMaster onClose={() => handleClose()} />
      </Modal>
      <Modal
        opened={action === "delete"}
        onClose={() => handleClose()}
        centered
        closeOnClickOutside={false}
      >
        <DeleteDialogMaster handleClose={handleClose} />
      </Modal>
    </div>
  );
}

export default ModalMaster;
