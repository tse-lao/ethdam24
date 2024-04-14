import Post from "@/components/feed/post";
import PageHeader from "@/components/ui/page-header";
import { PProjectFeed } from "@/lib/types";
import CreatePost from "./_components/create-post";

export default async function Chat({topic}: {topic: string}) {

  const encodedTopic = encodeURIComponent(topic);

  const data = await fetch(
    `http://127.0.0.1:8645/store/v1/messages?contentTopics=${encodedTopic}&pageSize=50&ascending=true`
  );


  const response = await data.json();

  for (const message of response.messages) {
    //change the message to the object
    message.payload = base64ToUint8Array(message.payload);
    message.payload = PProjectFeed.decode(message.payload);
    message.payload = message.payload.toJSON();

    console.log(message.payload);
  }

  function base64ToUint8Array(base64: string) {
    var binary_string = atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }

  return (
    <div className="m-5 flex flex-col gap-5">
      <PageHeader title="Chat" subtitle="Chat with other users" />

      <CreatePost contentTopic={topic} />
      {response.messages.map((message: any, index: number) => (
        <Post key={index} details={message} />
      ))}
    </div>
  );
}
