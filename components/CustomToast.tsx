import { toast } from "sonner";

export const showErrorToast = (message: string) => {
  toast.error(message, { position: "top-center" });
};

export const showInfoToast = (message: string) => {
  toast.info(message, { position: "top-center" });
};

export const showSuccessToast = (message: string) => {
  toast.success(message, { position: "top-center" });
};
