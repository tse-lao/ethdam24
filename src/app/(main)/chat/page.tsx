"use client"
import { toast } from '@/components/ui/use-toast';
import { useLightPush, useWaku } from '@waku/react';
import { createDecoder, createEncoder } from "@waku/sdk";
import protobuf from 'protobufjs';
import { useState } from 'react';

export default function ChatPage() {
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // Update the inputMessage state as the user input changes
    const handleInputChange = (e:any) => {
        setInputMessage(e.target.value);
    };

    // Create and start a Light Node
    const { node, error, isLoading } = useWaku();
    


    // Create a message encoder and decoder
    const contentTopic = "/waku-react-guide/1/chat/proto";
    const encoder = createEncoder({ contentTopic });
    const decoder = createDecoder(contentTopic);
    
    //@ts-ignore
    const { push } = useLightPush({ node, encoder });

    // Create a message structure using Protobuf
    const ChatMessage = new protobuf.Type("ChatMessage")
        .add(new protobuf.Field("timestamp", 1, "uint64"))
        .add(new protobuf.Field("message", 2, "string"));

    // Send the message using Light Push
    const sendMessage = async () => {
        if (!push || inputMessage.length === 0) return;

        // Create a new message object
        const timestamp = Date.now();
        const protoMessage = ChatMessage.create({
            timestamp: timestamp,
            message: inputMessage
        });

        // Serialise the message and push to the network
        const payload = ChatMessage.encode(protoMessage).finish();
        const {successes, failures} = await push({ payload });
        
        console.log(successes)
        
        if(failures && failures.length > 0) {
            console.error("Failed to send message", failures);
            toast({
                title: "Failed to send message",
                description: "Please try again later",
                variant: 'destructive'
            })
        }

        
    }

    return (
        <>
            <div className="chat-interface">
                <h1>Waku React Demo</h1>
                <div className="chat-body">
                    {messages.map((message:any, index) => (
                        <div key={index} className="chat-message">
                            <span>{new Date(message.timestamp).toUTCString()}</span>
                            <div className="message-text">{message.message}</div>
                        </div>
                    ))}
                </div>
                <div className="chat-footer">
                    <input
                        type="text"
                        id="message-input"
                        value={inputMessage}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                    />
                    <button className="send-button" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </>
    )
}
