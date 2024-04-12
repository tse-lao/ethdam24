"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PrivyProvider
        appId="clt5nzbg908p8a8fbrtmvglga"
        config={{
          // Customize Privy's appearance in your app
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
            logo: "https://detechies.com/images/detechies.png",
          },
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
          },
        }}
      >
        {children}
      </PrivyProvider>
    </SessionProvider>
  );
}
