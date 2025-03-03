"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary-foreground mb-4">
        Welcome to Paggo OCR
      </h1>
      <p className="text-xl text-zinc-400 mb-8">
        Upload{" "}
        <span className="italic underline text-purple-400">documents, extract text</span>{" "}
        and get
        <span className="font-bold text-indigo-600">
          {" "}
          interactive explanations.
        </span>
      </p>
      <div className="space-x-4">
        <Button
          variant="outline"
          className="font-bold text-md dark cursor-pointer bg-primary text-primary-foreground border-2"
          size="lg"
          onClick={() => route.push("/documents")}
        >
          View Documents
        </Button>
        <Button
          variant="outline"
          className="font-bold text-primary-foreground text-md border-indigo-600 hover:bg-indigo-600 hover:text-secondary transition-colors ease-in-out duration-500 cursor-pointer bg-primary border-2"
          size="lg"
          onClick={() => route.push("/upload")}
        >
          Upload Document
        </Button>
      </div>
    </div>
  );
}
