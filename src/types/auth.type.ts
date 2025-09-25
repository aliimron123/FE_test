export interface AuthResponse {
  status: boolean;
  message: string;
  code: number;
  is_logged_in: number;
  token: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface TokenPayload {
  id: number;
  username: string;
  iat: number;
  exp: number;
}
export interface ErrorResponse {
  status: boolean;
  message: string;
  code: number;
}
