"use client";

import dynamic from "next/dynamic";
import Loading from "./loading";

const LoginClient = dynamic(() => import("./ui/LoginClient"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function LoginPage() {
  return <LoginClient />;
}
