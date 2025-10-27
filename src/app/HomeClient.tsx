"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import Header from "./_components/Header";
import dynamic from "next/dynamic";
import Loader from "@/app/loading";

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
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  const getAutoTheme = () => {
    const hour = new Date().getHours();
    return hour >= 17 || hour < 7 ? "dark" : "light";
  };

  useLayoutEffect(() => {
    setIsMounted(true);

    const autoTheme = getAutoTheme();
    setTheme(autoTheme);
    const params = new URLSearchParams();
    params.set("theme", autoTheme);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, []);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      const autoTheme = getAutoTheme();
      setTheme(autoTheme);

      const params = new URLSearchParams();
      params.set("theme", autoTheme);
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 60000);

    return () => clearInterval(interval);
  }, [router]);

  if (!isMounted) return <Loader />;

  const isDark = theme === "dark";

  return (
    <main
      className={`relative min-h-screen overflow-hidden ${
        isDark ? "bg-[#001145] text-white" : "bg-white text-black"
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
