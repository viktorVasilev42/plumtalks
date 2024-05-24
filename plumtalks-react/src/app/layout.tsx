"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import useAuth from "./hooks/useAuth";
import { createContext } from "react";

const inter = Inter({ subsets: ["latin"] });

export const AuthContext = createContext<AuthContextInterface | null>(null);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { authToken, isLoading, handleLogin, handleLogout, handleRegister, userId, displayName } = useAuth();

  return (
    <html lang="en">
      <AuthContext.Provider value={{authToken, isLoading, handleLogin, handleLogout, userId, displayName, handleRegister}}>
        <body className={inter.className}>{children}</body>
      </AuthContext.Provider>
    </html>
  );
}
