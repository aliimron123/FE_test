"use client";

import React from "react";
import { Button, ButtonProps } from "@mantine/core";

type ButtonComponentProps = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    loading?: boolean;
  };

const ButtonComponent: React.FC<ButtonComponentProps> = ({ children, className, ...props }) => {
  return (
    <Button
      {...props}
      className={`transition-transform duration-150 active:scale-100 ${className}`}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
