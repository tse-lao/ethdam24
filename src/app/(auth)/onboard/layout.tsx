import type { Metadata } from "next";

import "../../globals.css";

import App from "@/app/app";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/lib/theme-provider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Drop Some Money",
  description:
    "It's now or never, time to drop some money, from one project to another",
  keywords:
    "developers, freelancers, profiles, tech, software, web, mobile, blockchain, projects, achievements, edutech",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      <Suspense fallback={<span>loading...</span>}>
        <App>
          {children}
          <Toaster />
        </App>
      </Suspense>
    </ThemeProvider>
  );
}
