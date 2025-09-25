"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import decodeJWT from "@/utils/lib/jwtDecode";
import { AuthResponse } from "@/types/auth.type";

interface IProps {
  children: React.ReactNode;
}

export type AuthContextType = {
  signIn: (dataAccess: string) => Promise<void>;
  signOut: () => Promise<void>;
  authData: AuthResponse | undefined;
  loading: boolean;
  isAuth: () => Promise<boolean | undefined>;
  addCookies: (dataAccess: string) => void;
  removeCookies: () => void;
};

const authContextDefaultValues: AuthContextType = {
  authData: undefined,
  loading: false,
  signIn: async (dataAccess: string) => {},
  signOut: async () => {},
  isAuth: async () => {
    return undefined;
  },
  addCookies: (dataAccess: string) => {},
  removeCookies: () => {},
};

export const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

const AuthProvider = ({ children }: IProps) => {
  const [authData, setAuthData] = useState<AuthResponse>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addCookies = (dataAccess: string) => {
    try {
      const valueDataAccess: AuthResponse = JSON.parse(dataAccess);

      // Simpan seluruh response di cookie "access"
      Cookies.set("access", dataAccess, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      // Simpan token secara terpisah
      Cookies.set("token", valueDataAccess.token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      // Update state authData
      setAuthData(valueDataAccess);
    } catch (error) {
      console.error("Gagal menyimpan cookies:", error);
    }
  };

  const removeCookies = () => {
    try {
      Cookies.remove("token");
      Cookies.remove("access");
      setAuthData(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (dataAccess: string) => {
    setLoading(true);
    try {
      // Simpan cookies
      addCookies(dataAccess);

      // Parsing untuk decode token
      const valueDataAccess: AuthResponse = JSON.parse(dataAccess);

      // Decode token untuk validasi
      const tokenPayload = decodeJWT(valueDataAccess.token);
      if (!tokenPayload) throw new Error("Token tidak valid");

      setLoading(false);
      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      removeCookies();
      router.refresh();
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  const isAuth = async () => {
    try {
      setLoading(true);
      const accessValue = Cookies.get("access");

      if (accessValue !== undefined) {
        const valueDataAccess: AuthResponse = JSON.parse(accessValue);

        setAuthData(valueDataAccess);
        setLoading(false);
        return true;
      }

      if (accessValue === undefined) {
        setAuthData(undefined);
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const valueContext = useMemo(
    () => ({
      authData,
      loading,
      signIn,
      signOut,
      isAuth,
      addCookies,
      removeCookies,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authData, loading]
  );

  return <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
