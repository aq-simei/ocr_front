"use client";

import { LoginRequiredContent } from "@/components/LoginRequiredContent/LoginRequiredContent";
import { useAuth } from "@/providers/Auth/AuthProvider";
import { DocumentUpload } from "@components/DocumentUpload/DocumentUpload";
export default function Upload() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return (
      <LoginRequiredContent
        title={"Ooops, you need to be logged in to upload a document."}
      />
    );
  }

  return (
    <div className="space-y-6 text-center w-full">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Upload New Document
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Upload a document for OCR processing and analysis.
        </p>
      </div>
      <DocumentUpload />
    </div>
  );
}
