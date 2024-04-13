import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/lib/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import App from "./app";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ethdam hackathon",
  description: "eth dam hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-light-light text-base text-gray-800`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <App>
            {children}
          </App>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
