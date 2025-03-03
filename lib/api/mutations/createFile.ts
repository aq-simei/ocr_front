import api from "@/lib/api";
import { toast } from "sonner";

export const uploadFile = async (file: File) => {
  toast.message("Uploading file");
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
