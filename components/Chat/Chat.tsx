"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ScrollArea/ScrollArea";
import api from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type LLMResponse = {
  id: string;
  question: string;
  response: string;
};

type ChatProps = {
  ocrId: string;
};

export function Chat({ ocrId }: ChatProps) {
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const getResponses = async (): Promise<any> => {
    const res = await api.post("openai/responses", {
      ocrId: ocrId,
    });
    return res.data || [];
  };

  const getResponseFromAi = async (question: string): Promise<string> => {
    const res = await api.post("openai/generate", {
      question: question,
      ocrId: ocrId,
    });
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["chat", ocrId],
    queryFn: getResponses,
  });

  const [messageHistory, setMessageHistory] = useState<LLMResponse[]>([]);

  const { mutateAsync: talkToChat } = useMutation({
    mutationFn: getResponseFromAi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", ocrId] });
      setMessageHistory(data);
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messageHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Simulating API call
      const response = await talkToChat(input.trim());
      console.log(response);
      setInput("");
    }
  };

  return (
    <Card className="w-full mx-auto max-w-2xl">
      <CardContent className="p-4">
        <ScrollArea className="h-[50vh] pr-4" ref={scrollAreaRef}>
          {data?.map((message: any) => (
            <div
              key={message.id}
              className="flex flex-col mb-4 space-y-2 w-full"
            >
              <div className="bg-blue-100 p-2 rounded-lg w-fit mr-auto">
                <strong>Question:</strong> {message.question}
              </div>
              <div className="bg-green-100 p-2 rounded-lg text-end w-fit ml-auto">
                <strong>Response:</strong> {message.response}
              </div>
            </div>
          ))}{" "}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Thinking..." : "Send"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
