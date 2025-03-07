import api from "@/lib/api";
import { sessionTokenSignIn } from "@/lib/api/mutations/sessionTokenSignIn";
import { useMutation } from "@tanstack/react-query";

export const useSessionTokenLogin = () => {
  const { mutateAsync } = useMutation({
    mutationFn: sessionTokenSignIn,
    mutationKey: ["sessionTokenSignIn"],
    onSuccess: (data) => {
      if (data != undefined) {
        localStorage.setItem(
          "sessionToken",
          data.sessionTokens.newSessionToken
        );
      }
    },
  });
  return {
    sessionTokenSignIn: mutateAsync,
  };
};
