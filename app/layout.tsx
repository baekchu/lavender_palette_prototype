"use client";

import ClientOnly from "@/components/ClientOnly";
import "../app/styles/globals.css";
import Footer from "@/components/home/Footer";

import Navbar from "@/components/Navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import ResetPassword from "@/components/modals/ResetPasswordModal";
import { Providers } from "@/components/Provider";

export const metadata = {
  title: "LavenderPalette",
  description: "창작의 숲",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body>
        <Providers>
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <ResetPassword />
            <Navbar />
            <div className="pb-20 pt-20">
            {children}
            </div>
            <Footer />
          </ClientOnly>
        </Providers>
      </body>
    </html>
  );
}
