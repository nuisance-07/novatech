import type { Metadata } from "next";
// import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/components/providers/QueryProvider";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import NovaAssistant from "@/components/ui/NovaAssistant";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   variable: "--font-montserrat",
//   display: "swap",
// });

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
      <body className="font-sans bg-background text-white antialiased selection:bg-primary/30">
        <QueryProvider>
          <Navbar />
          <CommandMenu />
          <div className="pt-16">
            {children}
          </div>
          <WhatsAppButton />
          <NovaAssistant />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}