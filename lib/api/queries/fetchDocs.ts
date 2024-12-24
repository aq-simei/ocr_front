import api from "@/lib/api";

export const fetchDocs = async () => {
  const res = await api.get("files/list");
  return res.data || [];
};
