import api from "@/lib/api";
import { signIn, UserSignInInput } from "@/lib/api/queries/signIn";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (input: UserSignInInput) => void;
  logout: () => void;
  pendingLogin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: signIn,
    onSuccess: (jwt) => {
      localStorage.setItem("jwtToken", jwt.access_token);
      api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${jwt.access_token}`;
        return config;
      });
      setIsAuthenticated(true);
      toast.success("Login successful", { position: "top-center" });
    },
    onError: (error) => {
      toast.error("Login failed", { position: "top-center" });
      console.log(error);
    },
  });

  const login = (input: UserSignInInput) => {
    loginMutation.mutate(input);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    toast.warning("You have been logged out", { position: "top-center" });
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      api.interceptors.request.use((config) => {
        delete config.headers.Authorization;
        return config;
      });
    }
    router.push("/auth/login");
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        login,
        isAuthenticated,
        logout,
        pendingLogin: loginMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
