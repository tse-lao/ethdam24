
import type { Metadata } from "next";

import "../../globals.css";

import App from "@/app/app";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/lib/theme-provider";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "deTechies | Developers Profiles",
  description:
    "We help developers distinquish themselves and flourish the future with the latest tech",
  keywords: "developers, freelancers, profiles, tech, software, web, mobile, blockchain, projects, achievements, edutech",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-light text-text-primary `}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <Suspense fallback={<span>loading...</span>}>
            <App>
              <main className="mx-auto max-w-lg flex items-center min-h-[100vh] px-4">
                {children}
              </main>
              <Toaster />
            </App>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
