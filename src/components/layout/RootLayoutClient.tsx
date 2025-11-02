"use client";

import { usePathname } from "next/navigation";
import { ClientLayout } from "./ClientLayout";
import { Question } from "../common/Question";
import { useState } from "react";
import { SupportManual } from "../common/SupportManual";
import { UserProvider } from "@/context/userContext";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" || pathname === "/reset";
  const isNurseryPage = pathname.includes("/nursery");
  const [isOpen, setIsOpen] = useState(false);

  return isLoginPage ? (
    children
  ) : isNurseryPage ? (
    <UserProvider>
      {children}
      <Question onOpen={() => setIsOpen(true)} />
      <SupportManual isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </UserProvider>
  ) : (
    <UserProvider>
      <ClientLayout>{children}</ClientLayout>
    </UserProvider>
  );
}
