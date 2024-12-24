import { getDocument } from "@/lib/api/queries/fetchDoc";
import { useQuery } from "@tanstack/react-query";

export const useFetchDoc = (name: string) => {
  const { data: document, isSuccess } = useQuery({
    queryKey: ["document", name],
    queryFn: () => getDocument(name),
  });
  return {
    document,
    isSuccess,
  }
};
