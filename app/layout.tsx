import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import Header from "@/components/header/Header";
import NavSideBar from "@/components/navigation/nav-sidebar";
import MobileNavBar from "@/components/navigation/mobile-navbar";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clivra - Chat App",
  description: "Chat with your friends, family and the world",
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
          className={cn(open_sans.className, "")}
        >
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <ModalProvider />
            <QueryProvider>
              <div className="h-full">
                <Header />
                <div className="md:flex p-2 lg:space-x-4 md:space-x-2 h-[calc(100%-131.2px)] lg:h-[calc(100%-65.6px)] min-h-[200px]">
                  <NavSideBar />
                  {children}
                </div>
                <MobileNavBar />
              </div>
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
