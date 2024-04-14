
//import { any, any } from "@/lib/types";
import {
    DecodedMessage,
    LightNode,
    createDecoder,
    createEncoder,
    createLightNode,
    waitForRemotePeer,
} from "@waku/sdk";

const contentTopic = "/dropsomemoney/0";

const encoder = createEncoder({ contentTopic });
const decoder = createDecoder(contentTopic);

// TODO: createNode
// TODO: subscribeToIncomingVotes
// TODO: retrieveExistingVotes
// TODO: sendVote


export const createNode = async () => {
  const waku = await createLightNode({ defaultBootstrap: true });
  await waitForRemotePeer(waku);
  return waku;
};

export const receiveVotes = async (
  waku: LightNode,
  callback: (pollMessage: any) => void,
) => {
  const _callback = (wakuMessage: DecodedMessage): void => {
    if (!wakuMessage.payload) return;
    const pollMessageObj = any.decode(wakuMessage.payload);
    const pollMessage = pollMessageObj.toJSON() as any;
    callback(pollMessage);
  };

  const unsubscribe = await waku.filter.subscribe([decoder], _callback);
  return unsubscribe;
};

export const sendVote = async (waku: LightNode, pollMessage: any) => {
  const protoMessage = any.create({
    id: pollMessage.id,
    question: pollMessage.question,
    answers: pollMessage.answers,
  });

  // Serialise the message using Protobuf
  const serialisedMessage = any.encode(protoMessage).finish();

  // Send the message using Light Push
  await waku.lightPush.send(encoder, {
    payload: serialisedMessage,
  });
};

export const retrieveExistingVotes = async (
  waku: LightNode,
  callback: (pollMessage: any) => void,
) => {
  const _callback = (wakuMessage: DecodedMessage): void => {
    if (!wakuMessage.payload) return;
    const pollMessageObj = any.decode(wakuMessage.payload);
    const pollMessage = pollMessageObj.toJSON() as any;
    callback(pollMessage);
  };

  // Query the Store peer
  await waku.store.queryWithOrderedCallback([decoder], _callback);
};