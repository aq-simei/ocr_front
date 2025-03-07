import api from "@/lib/api";

export const sessionTokenSignIn = async (input: {
  sessionToken: string;
}): Promise<{
  sessionTokens: { newSessionToken: string; jwtToken: string };
}> => {
  const res = await api.post("/auth/refresh-token", {
    sessionToken: input.sessionToken,
  });
  return res.data;
};
