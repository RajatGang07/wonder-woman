import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./redux/provider";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foresee",
  description: "Powered by Beige Bananas",
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
            <ToastContainer />
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
