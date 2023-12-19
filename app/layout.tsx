import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clivra - Chat App",
  description: "Chat with your friends, family and the world",
  metadataBase: new URL("https://clivra.vercel.app/"),
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
          className={cn(poppins.className, "min-h-[100%]")}
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
