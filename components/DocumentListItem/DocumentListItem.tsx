import Link from "next/link";
import { Link as LinkIcon, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Document } from "@/lib/types/Document";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { showSuccessToast } from "../CustomToast";
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
      showSuccessToast("Document deleted successfully");
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="w-full items-center flex justify-between">
          {doc.name}
          <Button
            className="ml-auto text-red-500 rounded-full border-2 border-red-500 hover:bg-red-500 hover:text-white  w-px transition-all duration-500"
            variant="default"
            onClick={() => deleteDoc()}
          >
            <Trash size={16} strokeWidth={3} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Created in: {uploadDate}</p>
        <Link
          href={`/document/${doc.name}`}
          className="flex items-center flex-row mt-2"
        >
          <LinkIcon />
          <p className="text-sm ml-1">View Document</p>
        </Link>
      </CardContent>
    </Card>
  );
};
