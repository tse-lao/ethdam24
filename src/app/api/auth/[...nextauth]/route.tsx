

import { authOptions } from "@/lib/auth-options";
import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    authToken: string;
    web3: {
      address: string;
      accessToken: string;
      user: {
        TBA: string;
        nft: string[];
        username: string;
        id: string;
        email: string;
        verified: boolean;
        wallet: string;
        display_name: string;
        avatar: string[];
        avatar_link: string;
        user_settings: {
          language: string;
          theme: string;
        }
      };
      github?: {
        account: any, 
        user: any,
        id: string;
        expires: string;
      };
      twitter: {
        account:any, 
        user:any
      };
      linkedin: {
        account:any, 
        user:any
      };
    };
    github?: {
      account: any, 
      user: any,
      id: string;
      expires: string;
    };
    twitter: {
      account:any, 
      user:any
    }
    linkedin: {
      account:any, 
      user:any
    }
  }

  interface JWT {
    sessions?: {
      github?: {
        id: string;
        expires: string;
      };
      web3?: {
        address: string;
        chainId: string;
        expires: string;
      };
      twitter: {
        account:any, 
        user:any
      }
    };
  }
}


const handler = NextAuth(authOptions) as any;

export { handler as GET, handler as POST };
