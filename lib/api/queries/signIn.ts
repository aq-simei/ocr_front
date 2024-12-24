import api from "@/lib/api";

export type UserSignInInput = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
};
type jwtToken = {
  access_token: string;
  expirationData: string;
}
export const signIn = async (input: UserSignInInput): Promise<jwtToken> => {
  const res = await api.post("auth/login", input);
  return res.data;
};
