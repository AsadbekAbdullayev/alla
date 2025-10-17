// app/(admin)/layout.tsx
"use client";
import AdminSider from "@/app/_components/Sidebar";
import AdminHeader from "@/app/_components/AdminHeader";
import AuthProvider from "@/providers/AuthProvider";
import { AntdProvider } from "@/providers/AntdProvider";
import { QueryProvider } from "@/providers/QueryProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AntdProvider>
      <QueryProvider>
        <AuthProvider>
          <div className=" text-white flex h-screen overflow-hidden">
            <AdminSider />
            <div className="flex flex-col flex-1">
              <AdminHeader />
              <main className="p-6 overflow-y-auto flex-1">{children}</main>
            </div>
          </div>
        </AuthProvider>
      </QueryProvider>
    </AntdProvider>
  );
}
