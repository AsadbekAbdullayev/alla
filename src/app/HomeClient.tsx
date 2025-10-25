"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./_components/Header";
import Loader from "@/app/loading";
import Footer from "@/app/_components/footer";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

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
  const opportunitiesRef = useRef<HTMLDivElement>(null);
  const childSecurityRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // function that scrolls smoothly
  // const scrollToSection = (section: string) => {
  //   const sectionMap: Record<string, React.RefObject<HTMLDivElement>> = {
  //     opportunites: opportunitiesRef,
  //     childSecurity: childSecurityRef,
  //     content: contentRef,
  //   };

  //   const target = sectionMap[section]?.current;
  //   if (target) {
  //     gsap.to(window, {
  //       duration: 1.2,
  //       scrollTo: { y: target, offsetY: 70 },
  //       ease: "power3.inOut",
  //     });
  //   }
  // };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <Loader />;

  return (
    <div
      className={`relative h-full overflow-hidden ${
        isDark ? "bg-[#001145]" : ""
      }`}
    >
      <Header />
      <CartoonSlides />
      <Content ref={contentRef} />
      <Opportunitites />
      <ChildSecurity />
      <Footer />
    </div>
  );
}
