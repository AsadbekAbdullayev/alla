"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetUser } from "@/entities/Profile/api";
interface AuthProviderProps {
  children: React.ReactNode;
  ignorePaths?: string[]; // bu sahifalarda token tekshirilmaydi
}

export default function AuthProvider({
  children,
  ignorePaths = [],
}: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  // const { data } = useGetUser();
  // console.log(data, "data");
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    // Tekshiruvni o'tkazib yuboradigan sahifalar
    if (ignorePaths.includes(pathname)) return;

    // Admin sahifalar
    const isAdminRoute =
      pathname.startsWith("/dashboard") && pathname !== "/dashboard/login";
    const isLoginRoute =
      pathname === "/login" || pathname === "/dashboard/login";

    if (!token) {
      if (isAdminRoute) router.push("/dashboard/login");
      else if (!isLoginRoute) router.push("/login");
      return;
    }

    if (token && isLoginRoute) {
      if (pathname.startsWith("/dashboard")) router.push("/dashboard");
      else router.push("/");
      return;
    }
  }, [pathname, router]);

  return <>{children}</>;
}
