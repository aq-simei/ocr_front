"use client";
import { useRef, useState } from "react";
import { Trash, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
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

  const {
    mutateAsync: uploadFile,
  } = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: upload,
    onSuccess: () => {
      toast.success("File uploaded successfully", { position: "top-center" });
      clearRefInput();
    },
    onError: () => {
      toast.error("Error uploading file, try again w/ another file", {
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
        toast.error("Invalid file type. Please upload a jpeg or png file.", {
          position: "top-center",
        });
        clearRefInput();
        return;
      }
      setFile(e.target.files[0]);
      toast.success("File picked successfully");
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
      toast.error("File not selected");
      return;
    }
    console.log("Uploading file:");
    await uploadFile(file);
    setUploading(false);
    clearRefInput();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div className="flex flex-row items-center">
        <label
          htmlFor="document"
          className="block text-sm font-medium  text-primary dark:text-primaryDark"
        >
          Upload Document
        </label>
        {file && (
          <span
            className="text-red-400 font-bold p-1 hover:cursor-pointer ml-3 flex flex-row items-center"
            onClick={clearRefInput}
            aria-label="Remove file"
          >
            <Trash className="mr-2" strokeWidth={4} size={16} />
            Clear file
          </span>
        )}
      </div>
      <Input
        type="file"
        id="document"
        ref={inputRef}
        accept="image/*"
        onChange={handleFileChange}
        className=" block w-full border-none rounded-md shadow-none px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 file:hover:border-indigo-500 sm:text-sm"
      />
      <Button
        type="submit"
        disabled={!file || uploading}
        className="inline-flex justify-center py-2 px-4 shadow-md -sm font-semibold rounded-md text-onAccent bg-accent hover:bg-indigo-500 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50 transition-colors ease-in-out duration-500 "
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
};
