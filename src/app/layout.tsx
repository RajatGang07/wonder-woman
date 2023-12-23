import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./redux/provider";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import NavBar from "./navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <AuthProvider>
        {/* <NavBar /> */}
          {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
