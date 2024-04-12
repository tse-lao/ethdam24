"use client";

import { LightNodeProvider } from "@waku/react";
import { SessionProvider } from "next-auth/react";

const NODE_OPTIONS = { defaultBootstrap: true };

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
        <LightNodeProvider options={NODE_OPTIONS}>{children}</LightNodeProvider>

    </SessionProvider>
  );
}
