"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./_components/Header";
import Loader from "@/app/loading";
import Footer from "@/app/_components/footer";

// dynamic imports
const CartoonSlides = dynamic(() => import("./_components/CartoonSlides"), {
  ssr: false,
});
const Opportunitites = dynamic(() => import("./_components/Opportunities"), {
  ssr: false,
});
const ChildSecurity = dynamic(() => import("./_components/ChildSecurity"), {
  ssr: false,
});
const Content = dynamic(() => import("./_components/Content"), { ssr: false });

export default function HomeClient() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const isDark = theme === "dark";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <Loader />;

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
