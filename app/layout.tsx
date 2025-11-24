import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import QueryProvider from "@/components/providers/QueryProvider";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import NovaAssistant from "@/components/ui/NovaAssistant";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NovaTech | Future Commerce",
  description: "The next generation of technology store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Navbar />
          <CommandMenu />
          <div className="pt-16">
            {children}
          </div>
          <WhatsAppButton />
          <NovaAssistant />
        </QueryProvider>
      </body>
    </html>
  );
}