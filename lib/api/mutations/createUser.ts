import api from "@/lib/api";

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
};

export const createUser = async (input: CreateUserInput): Promise<User> => {
  const res = await api.post("/user/new", input);
  return res.data;
};
