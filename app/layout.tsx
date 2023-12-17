import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clivra - Chat App",
  description: "Chat with your friends, family and the world",
  openGraph: {
    title: "Clivra",
    description: "Chat with your friends, family and the world",
    url: "https://clivra.vercel.app/",
    siteName: "Clivra",
    type: "website",
    images: ["https://clivra.vercel.app/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          suppressHydrationWarning={true}
          className={cn(open_sans.className, "min-h-[100%]")}
        >
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <ModalProvider />
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
