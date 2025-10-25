"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button, Form, Input, InputNumber, Upload } from "antd";

export default function ProfilePage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Cards animation
    const cards = listRef.current?.querySelectorAll(".video-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
          delay: 0.4,
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex-1 p-6 md:px-16">
      <div ref={listRef} className="flex flex-wrap gap-4">
        User detail
        <Form
          layout="vertical"
          className="w-full "
          onFinish={(values) => console.log("Form values:", values)}
          requiredMark={false}
        >
          <div className="flex gap-4">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please enter your first name" }]}
              className="flex-1"
            >
              <Input placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Please enter your last name" }]}
              className="flex-1"
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </div>

          <Form.Item
            label="Age"
            name="age"
            rules={[
              { required: true, message: "Please enter your age" },
              { type: "number", min: 0, message: "Age must be a positive number" }
            ]}
          >
            <InputNumber
              placeholder="Enter age"
              className="w-full"
              min={0}
            />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent auto upload
              maxCount={1}
            >
              <Button >Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
