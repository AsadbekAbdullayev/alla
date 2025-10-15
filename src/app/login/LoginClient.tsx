"use client";

import { Form } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import PhoneNumberCard from "./ui/PhoneNumberCard";
import OtpCard from "./ui/OtpCard";

export default function LoginPage() {
  const router = useRouter();
  const cardRef = useRef(null);
  const [form] = Form.useForm();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "phone-number";

  const handleNavigate = (nextStep: string) => {
    const params = new URLSearchParams();
    params.set("step", nextStep);
    router.push(`?${params.toString()}`);
  };

  // ===== Functions =====

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);
  useEffect(() => {
    if (!searchParams.get("step")) {
      router.replace("?step=phone");
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#211B64]">
      {step === "phone" && <PhoneNumberCard onNext={() => handleNavigate('verify-otp')} />}
      {step === "verify-otp" && <OtpCard onNext={() => handleNavigate('verify-name')} onBack={() => handleNavigate('phone')} />}
    </div>
  );
}
