import { TokenPayload } from "@/types/auth.type";

const decodeJWT = (token: string | undefined) => {
  const arrayToken = token?.split(".");

  if (arrayToken && arrayToken[1]?.includes("ey")) {
    return JSON.parse(atob(arrayToken![1])) as TokenPayload | undefined;
  }

  return undefined;
};

export default decodeJWT;
