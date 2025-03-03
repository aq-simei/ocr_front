import Link from "next/link";
import { Link as LinkIcon, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Document } from "@/lib/types/Document";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type DocListItemProps = {
  doc: Document;
};
export const DocumentListItem = ({ doc }: DocListItemProps) => {
  const queryClient = useQueryClient();
  const uploadDate = new Date(doc.createdAt).toLocaleString();
  const deleteDocument = async () => {
    await api.delete(`files/delete/${doc.name}`);
  };
  const { mutateAsync: deleteDoc } = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="w-full items-center flex justify-between">
          {doc.name}
          <button className="ml-auto text-red-500" onClick={() => deleteDoc()}>
            <Trash />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Created in: {uploadDate}</p>
        <Link
          href={`/documents/${doc.name}`}
          className="flex items-center flex-row mt-2"
        >
          <LinkIcon />
          <p className="text-sm ml-1">View Document</p>
        </Link>
      </CardContent>
    </Card>
  );
};
