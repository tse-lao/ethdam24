"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_AVATAR } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SimilarityDialog from "../extra/similarity-dialog";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { sendFeed } from "./send-feed";

export interface ProjectMatch {
  categories: string[] | null;
  similarity_score: number;
  simiilarity_data: object[];
  scope: string;
  simliar_packages: object[];
  simliar_languages: object[];
  reliability_score: number;
}

export default function CreateFeed({
  contentTopic,
  projectMatch,
}: {
  contentTopic: string;
  projectMatch: ProjectMatch;
}) {
  const [message, setMessage] = useState<string>("");
  const { refresh } = useRouter();
  const createPost = async () => {
    const result = await sendFeed(contentTopic, message);
    if (result == "OK") {
      toast({
        title: "Post created",
        description: "Your post has been created",
      });
      setMessage("");
      refresh();
    }
    //if this status is succesfull please return a succesfull message back.
  };
  return (
    <div className="flex gap-2.5 px-4 py-5 border rounded-md">
      <div className="flex flex-col gap-1">
        <Avatar className="h-20 w-20">
          <AvatarImage src={DEFAULT_AVATAR} alt="User" className="h-20 w-20" />
        </Avatar>
        <SimilarityDialog projectMatch={projectMatch} />
      </div>
      <Textarea
        placeholder="Enter your message"
        className="border-none bg-transparent"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={createPost}>Feedback</Button>
    </div>
  );
}
