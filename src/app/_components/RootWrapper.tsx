// app/_components/RootWrapper.tsx (Client Component)
"use client";

import { QueryProvider } from "@/providers/QueryProvider";
import { AntdProvider } from "@/providers/AntdProvider";
import AuthProvider from "@/providers/AuthProvider";

export default function RootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AntdProvider>
      <QueryProvider>
        <AuthProvider
          ignorePaths={["/", "/profile", "/login", "/dashboard/login"]}
        >
          {children}
        </AuthProvider>
      </QueryProvider>
    </AntdProvider>
  );
}
