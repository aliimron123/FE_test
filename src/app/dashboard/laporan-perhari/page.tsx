"use client";

import React, { useState } from "react";
import { Modal } from "@mantine/core";
import { Button } from "@/components/ui";

function Page() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center">
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Modal title" centered>
        <p>Modal content</p>
      </Modal>
    </div>
  );
}

export default Page;
