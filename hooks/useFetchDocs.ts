import { fetchDocs } from "@/lib/api/queries/fetchDocs";

import { useQuery } from "@tanstack/react-query";
export const useFetchDocs = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: () => fetchDocs(),
  });
  return {
    documents: data || [],
    isSuccess,
    isLoading
  };
};
