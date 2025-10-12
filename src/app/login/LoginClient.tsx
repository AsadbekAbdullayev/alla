"use client";

import { Form, Input, Button, Card } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoginPage() {
  const router = useRouter();
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const onFinish = (values: any) => {
    // Mock auth
    if (values.username && values.password) {
      sessionStorage.setItem("token", "user_token_123");
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Card
        ref={cardRef}
        title="User Login"
        className="w-full max-w-sm shadow-2xl rounded-2xl"
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Enter your password" />
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
