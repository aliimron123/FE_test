import { toast } from "sonner";
import { AuthResponse, LoginData } from "@/types/auth.type";

export async function userLogin({ username, password }: LoginData): Promise<AuthResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Gagal login");
  }

  const data: AuthResponse = await res.json();

  if (!data?.token || !data.status) {
    toast.error(data.message || "Gagal login");
    throw new Error(data.message || "Gagal login");
  }

  return data;
}
