"use client";
import { DocumentListItem } from "@/components/DocumentListItem/DocumentListItem";
import { LoginRequiredContent } from "@/components/LoginRequiredContent/LoginRequiredContent";
import { useFetchDocs } from "@/hooks/useFetchDocs";
import { Document } from "@/lib/types/Document";
import { useAuth } from "@/providers/Auth/AuthProvider";

export default function Documents() {
  const { documents, isLoading } = useFetchDocs();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <LoginRequiredContent
        title={"Ooops, you need to be logged in to upload a document."}
      />
    );
  }

  if (!isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-primary-foreground mb-6">
          Your Documents
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-md gap-6">
          {documents.length === 0 && (
            <div className="col-span-1">
              <p className="text-gray-700 text-lg">
                You don't have any documents yet.
              </p>
            </div>
          )}
          {documents.length !== 0 &&
            documents.map((doc: Document) => (
              <div className="col-span-1" key={doc.id}>
                <DocumentListItem doc={doc} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}
