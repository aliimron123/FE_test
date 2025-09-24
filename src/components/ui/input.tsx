"use client";

import React, { useState } from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

type InputProps = Omit<TextInputProps, "type"> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    variant?: "default" | "password"; // optional biar default otomatis
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", type, ...props }, ref) => {
    const [show, isShow] = useState<boolean>(false);
    const handleShow = () => isShow(!show);

    switch (variant) {
      case "password":
        return (
          <TextInput
            ref={ref}
            type={show ? "text" : "password"}
            rightSection={
              show ? <IconEyeOff onClick={handleShow} /> : <IconEye onClick={handleShow} />
            }
            {...props}
          />
        );

      case "default":
      default:
        return <TextInput ref={ref} type={type ?? "text"} {...props} />;
    }
  }
);

Input.displayName = "Input";

export default Input;
