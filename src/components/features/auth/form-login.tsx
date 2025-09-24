"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/api/auth";
import { useForm } from "@mantine/form";
import { toast } from "sonner";
import { Button, Input } from "@/components/ui";
import { useAuth } from "@/utils/hooks/useAuth";
import { LoginData } from "@/types/auth.type";

function FormLogin() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<LoginData>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) => (value.length < 1 ? "Username wajib diisi" : null),
      password: (value) => (value.length < 1 ? "Password wajib diisi" : null),
    },
  });

  const handleSubmit = async (values: LoginData) => {
    setLoading(true);
    try {
      // Panggil API login
      const data = await userLogin(values);

      await signIn(JSON.stringify(data));

      toast.success("Login berhasil!", { position: "top-center" });

      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Username atau password salah", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <div className="flex flex-col space-y-2 text-center">
        <Image
          src={"/assets/logo-jasamarga.png"}
          width={800}
          height={800}
          className="mx-auto h-32 w-32"
          alt="logo"
          loading="eager"
        />
        <p className="text-muted-foreground text-sm">
          Silakan masukkan email dan kata sandi Anda untuk masuk.
        </p>
      </div>
      <form className="flex flex-col gap-8" onSubmit={form.onSubmit(handleSubmit)}>
        <div className="flex w-full max-w-xs flex-col gap-2">
          <Input
            label="Username"
            placeholder="Your username"
            classNames={{
              input: "rounded-xl border-gray-300 text-sm focus:ring-1 focus:ring-blue-400", // input element
              label: "text-gray-700 text-sm font-medium ", // label element
            }}
            {...form.getInputProps("username")}
          />

          <Input
            label="Password"
            variant="password"
            placeholder="Your password"
            type="password"
            classNames={{
              input: "rounded-xl border-gray-300 text-sm focus:ring-1 focus:ring-blue-400",
              label: "text-gray-700 text-sm font-medium ",
            }}
            {...form.getInputProps("password")}
          />
        </div>
        <Button
          disabled={loading}
          type="submit"
          className="rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default FormLogin;
