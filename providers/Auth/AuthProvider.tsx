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

type AuthContextType = {
  isAuthenticated: boolean;
  login: (input: UserSignInInput) => Promise<void>;
  logout: () => void;
  pendingLogin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [isPending, updateIsPending] = useState<boolean>(false);

  const login = async (input: UserSignInInput) => {
    const jwt = await signIn(input);
    localStorage.setItem("jwtToken", jwt.access_token);
    api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${jwt}`;
      return config;
    });
    updateIsPending(false);
    setIsAuthenticated(true);
    toast.success("Login successful", { position: "top-center" });
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

  return (
    <AuthContext.Provider
      value={{ login, isAuthenticated, logout, pendingLogin: isPending }}
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
