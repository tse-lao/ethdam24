import Chat from "./chat";

export default async function ChatPage() {
  const topic = "/eth-dam/2/main-room-1/proto";


  return (
    <Chat topic={topic} />
  );
}
