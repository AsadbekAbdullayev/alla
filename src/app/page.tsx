"use client";

import dynamic from "next/dynamic";
import Loading from "./loading";

const HomeComponent = dynamic(() => import("./HomeClient"), {
  loading: Loading,
  ssr: false,
});

export default function HomePage() {
  return <HomeComponent />;
}
