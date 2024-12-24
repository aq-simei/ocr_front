"use client";
import { DocumentListItem } from "@/components/DocumentListItem/DocumentListItem";
import { LoginRequiredContent } from "@/components/LoginRequiredContent/LoginRequiredContent";
import { useFetchDocs } from "@/hooks/useFetchDocs";
import { Document } from "@/lib/types/Document";
import { useAuth } from "@/providers/Auth/AuthProvider";

export default function Documents() {
  const {documents, isSuccess} = useFetchDocs();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <LoginRequiredContent />;
  }
  if (isSuccess && documents.length !== 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Your Documents
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-md gap-6">
          {documents.map((doc: Document) => (
            <div className="col-span-1" key={doc.id}>
              <DocumentListItem doc={doc} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
