"use client";

import { Chat } from "@/components/Chat/Chat";
import { Button } from "@/components/ui/button";
import { useFetchDoc } from "@/hooks/useFetchDoc";
import api from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleAlert, FileWarning } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function DocumentDetails() {
  const params = useParams();
  const queryClient = useQueryClient();

  const { isSuccess, document } = useFetchDoc(params.name[0]);

  const handleRequestExtractText = async () => {
    toast.message("Requesting text extraction");
    const res = await createExtractedText({ filename: params.name });
    return res;
  };

  const { mutateAsync: createExtractedText, isPending: creatingText } =
    useMutation({
      mutationFn: async (data: any) => {
        const res = await api.post("ocr/extract-text/", data);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["document", params.name[0]]);
      },
    });

  const getOcrResult = async () => {
    const res = await api.post(`ocr/content`, {
      filename: params.name,
      ocrId: document?.ocrResultId,
    });
    return res.data;
  };

  const { data: ocrResult, isSuccess: successForOcr } = useQuery({
    queryKey: ["ocrResult", params.name],
    queryFn: getOcrResult,
  });

  if (isSuccess) {
    const formattedDate = new Date(document.createdAt).toLocaleString();
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Document Details
        </h1>
        <div className="bg-white shadow sm:rounded-lg w-full">
          <div className="px-4 py-5 sm:px-6 flex-col flex">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Document Information
            </h3>
            <div className="mt-1 max-w-2xl text-sm font-bold text-gray-500 gap-1 flex flex-col">
              <p className="text-primary">Name: {document.name}</p>
              <p>Creation Date: {formattedDate}</p>
              <p className="text-primary">File Format: {document.format}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
              Extracted Text
            </h3>
            <div className="text-sm text-gray-500 w-full flex flex-row items-center justify-between">
              {document.ocrResultId != null && successForOcr ? (
                <p>{ocrResult.text}</p>
              ) : (
                <div className="w-full flex flex-row">
                  <span className="font-bold flex flex-row items-center">
                    <FileWarning className="text-yellow-600 mr-2" />
                    No text extracted from document yet !
                  </span>
                  <div className="ml-auto">
                    {creatingText ? (
                      <p>Loading text extraction</p>
                    ) : (
                      <Button
                        variant={"secondary"}
                        className="border-2 border-indigo-600 font-bold hover:bg-indigo-600 hover:text-secondary"
                        onClick={() => {
                          handleRequestExtractText();
                        }}
                      >
                        Request Text Extraction
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6 flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ask a Question
            </h3>
            {document.ocrResultId != null && ocrResult ? (
              <Chat ocrId={ocrResult.id} />
            ) : (
              <div className="flex flex-row items-center w-2/4">
                <CircleAlert className="text-red-600" />
                <span className="font-bold text-center">
                  Cannot ask a question without text extracted from document You
                  can request a text extraction by clicking the button bellow
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Download Document
          </button>
        </div>
      </div>
    );
  }
}
