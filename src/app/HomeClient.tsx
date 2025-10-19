"use client";

import { useEffect, useState } from "react";
import Footer from "@/app/_components/footer";
import Header from "./_components/Header";
import CartoonSlides from "./_components/CartoonSlides";
import Content from "./_components/Content";
import Opportunitites from "./_components/Opportunities";
import ChildSecurity from "./_components/ChildSecurity";
import { useSearchParams } from "next/navigation";
import { Spin } from "antd";

export default function HomeClient() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const isDark = theme === "dark";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${
        isDark ? "bg-[#001145]" : ""
      }`}
    >
      <Header />
      <CartoonSlides />
      <Content />
      <Opportunitites />
      <ChildSecurity />
      <Footer />
    </div>
  );
}
