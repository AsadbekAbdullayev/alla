"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetUser } from "@/entities/Profile/api";
import { setUserDetails } from "@/redux/slices/generelSlice";
import Loader from "@/app/_components/Loader";
import { useDispatch } from "react-redux";
import { Spin } from "antd";

interface AuthProviderProps {
  children: React.ReactNode;
  ignorePaths?: string[]; // bu sahifalarda token tekshirilmaydi
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetUser();

  useEffect(() => {
    dispatch(
      setUserDetails({
        id: data?.data.id,
        lastName: data?.data.lastName,
        firstName: data?.data.firstName,
        phoneNumber: data?.data.phoneNumber,
        profileImageUrl: data?.data.profileImageUrl,
        role: data?.data.role,
        status: data?.data.status,
      })
    );
  }, [data]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const path = window.location.pathname;

    if (!token && path !== "/" && !path.includes("login")) {
      router.push("/login");
      return;
    }
  }, [pathname]);

  return <>{isLoading ? <Loader /> : children}</>;
}
