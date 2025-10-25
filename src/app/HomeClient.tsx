"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./_components/Header";
import dynamic from "next/dynamic";
import Loader from "@/app/loading";

// dynamic imports
const CartoonSlides = dynamic(() => import("./_components/CartoonSlides"), {
  ssr: false,
  loading: () => <h1>CartoonSlides Loading ...</h1>,
});
const Opportunitites = dynamic(() => import("./_components/Opportunities"), {
  ssr: false,
  loading: () => <h1>Opportunities Loading ...</h1>,
});
const ChildSecurity = dynamic(() => import("./_components/ChildSecurity"), {
  ssr: false,
  loading: () => <h1>ChildSecurity Loading ...</h1>,
});
const Content = dynamic(() => import("./_components/Content"), {
  ssr: false,
  loading: () => <h1>Content Loading ...</h1>,
});
const Footer = dynamic(() => import("./_components/footer"), {
  ssr: false,
  loading: () => <h1>footer Loading ...</h1>,
});

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
    <main
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
    </main>
  );
}
