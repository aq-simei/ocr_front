import api from "@/lib/api";
import { showErrorToast } from "@/components/CustomToast";

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

export type LoginResponseData = {
  token: string;
  sessionToken: string;
};

export const signIn = async (input: UserSignInInput): Promise<LoginResponseData> => {
  try {
    const res = await api.post("auth/login", input);
    return res.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      console.log("Full error response:", error.response);
      showErrorToast("Invalid email or password");
    } else {
      console.log("Full error response:", error.response);
      showErrorToast("An error occurred. Please try again later.");
    }
    return Promise.reject(error);
  }
};
