"use client";

import { SessionProvider } from "next-auth/react";

export interface IAuthContextProps {
  children: React.ReactNode;
}

// React.ReactNode é um tipo fornecido pelo React que representa qualquer coisa que pode ser renderizada por um componente React.

export default function AuthContext({ children }: IAuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
