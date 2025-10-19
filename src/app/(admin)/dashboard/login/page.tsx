"use client";

import { Form, Input, Button, Card } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AdminLoginPage() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Faqat client-side da ishlashini ta'minlash
    if (typeof window !== "undefined" && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, rotateX: -20 },
        { opacity: 1, scale: 1, rotateX: 0, duration: 1, ease: "back.out(1.7)" }
      );
    }
  }, []);

  const onFinish = (values: any) => {
    if (values.username === "admin" && values.password === "admin123") {
      sessionStorage.setItem("token", "admin_token_456");
      router.push("/dashboard");
    } else {
      alert("Incorrect admin credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <Card
        ref={cardRef}
        title="Admin Dashboard Login"
        className="w-full max-w-sm shadow-2xl rounded-2xl bg-gray-900 text-white"
        styles={{
          header: {
            color: "#fff",
            fontWeight: "bold",
          },
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<span className="text-gray-300">Username</span>}
            name="username"
            rules={[{ required: true, message: "Enter admin username" }]}
          >
            <Input placeholder="admin" />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-300">Password</span>}
            name="password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input.Password placeholder="admin123" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
