"use server";

import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../auth-options";



export async function getUserSession() {
  const session = (await getServerSession(authOptions)) as Session;
  if (!session?.web3?.user) {
    redirect("/onboard");
  }
  return session.web3;
}