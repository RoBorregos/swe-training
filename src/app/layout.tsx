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
      <body className="min-h-screen bg-primary">
        <SessionProvider>
          <TRPCReactProvider>
            <Navbar />
            {/* consider the height of navbar and footer */}
            <div className="min-h-[92vh] px-20 pb-10 pt-28">{children}</div>
            <Footer />
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
