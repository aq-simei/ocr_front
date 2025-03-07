"use client";
import { useRef, useState } from "react";
import { Check, Trash, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { Close } from "@radix-ui/react-dialog";
import { showErrorToast, showSuccessToast, showInfoToast } from "@/components/CustomToast";

export const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    showInfoToast("Uploading file");
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };

  const { mutateAsync: uploadFile } = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: upload,
    onSuccess: () => {
      showSuccessToast("File uploaded successfully", { position: "top-center" });
      clearRefInput();
    },
    onError: () => {
      showErrorToast("Error uploading file, try again w/ another file", {
        position: "top-center",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (
        e.target.files[0].type !== "image/jpeg" &&
        e.target.files[0].type !== "image/png"
      ) {
        showErrorToast("Invalid file type. Please upload a jpeg or png file.", {
          position: "top-center",
        });
        clearRefInput();
        return;
      }
      setFile(e.target.files[0]);
      showSuccessToast("File picked successfully");
    } else {
      setFile(null);
    }
  };

  const clearRefInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      showErrorToast("File not selected");
      return;
    }
    console.log("Uploading file:");
    await uploadFile(file);
    setUploading(false);
    clearRefInput();
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 space-x-4 max-w-xl mx-auto"
    >
      <div className="flex flex-col items-center justify-between">
        <label
          htmlFor="document"
          className="text-md font-semibold  text-primary dark:text-primaryDark"
        >
          Start by uploading a new document
        </label>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <Input
          type="file"
          id="document"
          ref={inputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-row items-center justify-center space-x-2 w-full">
          {file && (
            <p className="text-gray-900 dark:text-gray-100 font-semibold">
              {file.name}{" "}
              <span className="text-gray-500 text-sm">
                ({(file.size / 1024).toFixed(2)} KB)
              </span>
            </p>
          )}
          <Button
            type="button"
            variant={"default"}
            onClick={handleButtonClick}
            className="inline-flex justify-center py-2 px-4 shadow-md -sm font-semibold rounded-md text-onAccent bg-accent hover:bg-indigo-500 hover:text-secondary focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors ease-in-out duration-500 "
          >
            {file ? "Change File" : "Choose File"}
          </Button>

          {file && (
            <Button
              variant={"link"}
              onClick={clearRefInput}
              aria-label="Remove file"
              className="hover:font-bold"
            >
              <X strokeWidth={3} size={16} />
              Drop selection
            </Button>
          )}
        </div>
        <Button
          type="submit"
          disabled={!file || uploading}
          className="inline-flex justify-center py-2 px-4 shadow-md -sm font-semibold rounded-md text-onAccent bg-accent hover:bg-indigo-500 hover:text-secondary focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50 transition-colors ease-in-out duration-500 "
        >
          {uploading ? (
            "Uploading..."
          ) : (
            <>
              <Check strokeWidth={3}/>
              <span>Upload</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
