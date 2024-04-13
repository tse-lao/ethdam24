import { LightNodeProvider } from "@/lib/waku/light-node-context";
import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LightNodeProvider>
      <div>{children}</div>
    </LightNodeProvider>
  );
}
