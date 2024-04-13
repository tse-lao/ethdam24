"use client"

import { useLightNode } from "@/lib/waku/light-node-context";
import { Vote } from "@/lib/waku/proto/vote";
import { loadVotes } from "@/lib/waku/service";
import { LightNode } from "@waku/sdk";

// Waku Imports

// Protobuf Import
export default function ChatPage() {
    const {node, isLoading} = useLightNode();
    
    const fetchVotes = async (messageMap: Record<string, any>) => {
        const votes = await loadVotes(node as LightNode);    
        for await (const votePromises of votes) {
          if (Array.isArray(votePromises)) {
            await Promise.all(votePromises.map(async (votePromise) => {
              try {
                const msg = (await votePromise) as any; 
                const vote = Vote.decode(msg.proto.payload);
    
                if (!messageMap[vote.cId]) {
                  messageMap[vote.cId] = { votes: 0 };
                }
                messageMap[vote.cId].votes += vote.isUpvote ? 1 : -1;
              } catch (error) {
                console.error('Error processing vote:', error);
              }
            }));
          } else {
            console.error('votePromises is not an array of Promises:', votePromises);
            // Handle case where votePromises might not be what's expected
          }
        }
    }
    
    return (
        <main>
            Chat here
            
            
        </main>
    )
}