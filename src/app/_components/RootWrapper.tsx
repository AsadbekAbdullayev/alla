// app/_components/RootWrapper.tsx (Client Component)
"use client";

import AuthProvider from "@/providers/AuthProvider";
import { AntdProvider } from "@/providers/AntdProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { usePathname } from "next/navigation";

export default function RootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/login" && pathname !== "/dashboard/login";

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
