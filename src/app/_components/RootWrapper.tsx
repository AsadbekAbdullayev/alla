// app/_components/RootWrapper.tsx (Client Component)
"use client";

import { QueryProvider } from "@/providers/QueryProvider";
import { AntdProvider } from "@/providers/AntdProvider";
import AuthProvider from "@/providers/AuthProvider";
import { BrowserRouter } from "react-router-dom";

export default function RootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BrowserRouter>
      <AntdProvider>
        <QueryProvider>
          <AuthProvider
            ignorePaths={["/", "/profile", "/login", "/dashboard/login"]}
          >
            {children}
          </AuthProvider>
        </QueryProvider>
      </AntdProvider>
    </BrowserRouter>
  );
}
