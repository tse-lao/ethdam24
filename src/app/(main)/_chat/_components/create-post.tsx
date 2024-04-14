"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendPost } from "./send-post";

export default function CreatePost({ contentTopic }: { contentTopic: string }) {
  const [message, setMessage] = useState<string>("");
    const {refresh} = useRouter();
  const createPost = async () => {
    const result = await sendPost(contentTopic, message);
    
    if(result == 'OK'){
        toast({
            title: "Post created",
            description: "Your post has been created",
        })
        setMessage('');
        refresh();
    }
    //if this status is succesfull please return a succesfull message back.
  };
  return (
    <div className="flex gap-2.5">
      <Input
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={createPost}>Post</Button>
    </div>
  );
}
