'use server'

import { getSession } from "next-auth/react";

import { toast } from "@/components/ui/use-toast";

import { API_URL } from "@/lib/constants";
import { auth } from "../auth-options";


export async function serverRequest(endpoint:string, searchParams?: any) {
  const method = 'GET'
    const session = await auth();
  
    if (!session || !session.web3 || !session.web3.accessToken) {
      throw new Error("Invalid session or missing access token");
    }
  
    
    
    let url = new URL(`${API_URL}${endpoint}`);
    
  
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      url.search = params.toString();
    }  
  
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "api-key": "framework",
        Authorization: `Bearer ${session.web3.accessToken}`,
      },
    } as any;
  

    const response = await fetch(url, options);
  
    if (!response.ok) {
        throw new Error(`Failed to ${method} data from ${endpoint}`);

          
    }
  
    return response.json();
  }
  
  export async function clientGetAPI(endpoint:string, method = 'GET', body = null) {
    const session = await getSession();
  
    if (!session || !session.web3 || !session.web3.accessToken) {
      throw new Error("Invalid session or missing access token");
    }
  
    const url = `${API_URL}${endpoint}`;
  
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.web3.accessToken}`,
      },
    } as any;
  
    if (body) {
      options.body = body
    }
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
        toast({
            title: "Error",
            description: `Failed to ${method} data from ${endpoint}`,
          });
          
    }
  
    return response.json();
  }
  
  