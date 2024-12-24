import api from "@/lib/api";
import { Document } from "@/lib/types/Document";

export const getDocument = async (name: string): Promise<Document> => {
  const res = (await api.get(`files/data/${name}`)) || [];
  return res?.data as Document || [];
};

