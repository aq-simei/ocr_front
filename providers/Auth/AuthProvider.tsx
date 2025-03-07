import api from "@/lib/api";
import {
  LoginResponseData,
  signIn,
  UserSignInInput,
} from "@/lib/api/queries/signIn";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { showErrorToast, showSuccessToast } from "@/components/CustomToast";
import { useSessionTokenLogin } from "@/hooks/useSessionTokenLogin";
import { set } from "zod";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (input: UserSignInInput) => Promise<LoginResponseData | undefined>;
  logout: () => void;
  pendingLogin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { sessionTokenSignIn } = useSessionTokenLogin();
  const checkedRefetchLogin = useRef(false);
  const router = useRouter();
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: signIn,
    onSuccess: (data) => {
      localStorage.removeItem("sessionToken");
      console.log(data.sessionToken);
      localStorage.setItem("sessionToken", data.sessionToken);
      setAuthToken(data.token);
      setIsAuthenticated(true);
      showSuccessToast("Login successful");
      router.push("/");
    },
    onError: () => {
      console.log("Error logging in");
    },
  });

  const login = async (input: UserSignInInput) => {
    try {
      const res = await loginMutation.mutateAsync(input);
      return res;
    } catch (error) {
      console.log("Error logging in ", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("sessionToken");
    setAuthToken(null);
    showErrorToast("You have been logged out");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (checkedRefetchLogin.current) {
      return;
    }
    const token = localStorage.getItem("sessionToken");
    if (token) {
      try {
        sessionTokenSignIn({ sessionToken: token }).then((data) => {
          setAuthToken(data?.sessionTokens.jwtToken);
        });
        checkedRefetchLogin.current = true;
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Error logging in ", error);
        showErrorToast("Error on auto login");
      }
    }
  }, []);

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
