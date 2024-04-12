"use client"
import { usePrivy, useSignMessage } from "@privy-io/react-auth";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { SiweMessage } from "siwe";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import LoginButton from "./login-button";
import LogoutButton from "./logout";


export default function Authentication() {
    const {  authenticated, user } = usePrivy();
    const {signMessage} = useSignMessage({
      onSuccess: (message) => {
        console.log(message);
      
      }
    });
    const { data: session } = useSession();
    const [signing, setSigning] = useState(false);
    
  const handleSign = async () => {
    setSigning(true); 
    console.log("signing in")
    const message = new SiweMessage({
      domain: window.location.host,
      uri: window.location.origin,
      version: "1",
      address: user?.wallet?.address,
      statement: "Sign in Techie",
      nonce: await getCsrfToken(),
      chainId: 1,
    });



    const preparedMessage = message.prepareMessage()
    console.log(preparedMessage);
    const signedMessage = await signMessage(preparedMessage);
    console.log(signedMessage);
    try {

      //privy sing message. 
      
    
      
      const response = await signIn("web3", {
        message: JSON.stringify(message),
        signature: signedMessage,
        address: user?.wallet?.address,
        redirect: true,
        callbackUrl: "/",
      });
      if (response?.error) {
        toast({
          title: "Error",
          description: response.error,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    }

    setSigning(false);
  };
    return (
      <div className="">
        {authenticated ? <LogoutButton /> : <LoginButton />}
        
        {authenticated && session?.web3.address != user?.wallet?.address && (
          <Button onClick={handleSign} disabled={signing}>
            Sign in
          </Button>
        )}
      </div>
    );
  }
  