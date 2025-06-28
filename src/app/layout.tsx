import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/nav/navbar";
import Footer from "./_components/nav/footer";

export const metadata: Metadata = {
  title: "SWE Training",
  description: "By RoBorregos",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-primary min-h-screen">
        <SessionProvider>
          <TRPCReactProvider>
            <Navbar />
            <div className="px-20 pt-28 pb-10 min-h-screen">
              {children}
            </div>
            <Footer />
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
