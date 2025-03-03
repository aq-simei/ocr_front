"use client";
import { Button } from "@/components/ui/button";
import { UseChangeName } from "@/hooks/useChangeName";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Paggo OCR
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Upload documents, extract text, and get interactive explanations.
      </p>
      <div className="space-x-4">
        <Button
          variant="outline"
          className="font-bold text-md"
          size="lg"
          onClick={() => route.push("/documents")}
        >
          View Documents
        </Button>
        <Button
          variant="outline"
          className="font-bold text-md hover:bg-indigo-800 hover:text-secondary transition-colors ease-in-out duration-500"
          size="lg"
          onClick={() => route.push("/upload")}
        >
          Upload Document
        </Button>
      </div>
    </div>
  );
}
