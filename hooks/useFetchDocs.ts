import { fetchDocs } from "@/lib/api/queries/fetchDocs";
import { useAuth } from "@/providers/Auth/AuthProvider";

import { useQuery } from "@tanstack/react-query";
export const useFetchDocs = () => {
  const {isAuthenticated} = useAuth();
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: () => fetchDocs(),
    enabled: isAuthenticated
  });
  return {
    documents: data || [],
    isSuccess,
    isLoading
  };
};
