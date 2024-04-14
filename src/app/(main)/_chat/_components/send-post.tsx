"use server";
import { PProjectFeed } from "@/lib/types";

export async function sendPost(contentTopic: string, message: string) {
  const url = "http://127.0.0.1:8645/relay/v1/auto/messages";

  const randomId = Math.floor(Math.random() * 1000);
  const protoMessage = PProjectFeed.create({
    id: randomId.toString(),
    message: message,
    comments: [],
    likes: 0,
  });
  const payload = PProjectFeed.encode(protoMessage).finish();


  const base64Payload = btoa(String.fromCharCode(...Array.from(payload)));

  console.log(base64Payload);

  const result = fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({
      contentTopic: contentTopic,
      payload: base64Payload
    }),
  });
  
  console.log(result)
  const response = (await result).text();
  

  return response;
}
