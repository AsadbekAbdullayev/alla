"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Upload,
  Avatar,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useGetUser, useUpdateUser } from "@/entities/Profile/api";

export default function ProfilePage() {
  const [form] = Form.useForm();
  const listRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { mutateAsync: updateUser, isLoading: isUpdating } = useUpdateUser();
  const { data: userData, isLoading: isUserLoading } = useGetUser();

  // Submit updated data
  const handleSubmit = async (values: any) => {
    try {
      const imageFile = values.image?.[0];
      const imageUrl =
        imageFile?.url || userData?.data?.profileImageUrl || null;

      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        age: values.age,
        profileImageUrl: imageUrl, // ✅ only send URL
      };

      await updateUser(payload);
      message.success("Profile updated successfully!");
    } catch (error: any) {
      message.error(error.message || "Failed to update profile");
    }
  };

  // Prefill form with user data
  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        firstName: userData?.data?.firstName,
        lastName: userData?.data?.lastName,
        age: userData?.data?.age,
        image: userData?.data?.profileImageUrl,
      });
    }
  }, [userData, form]);

  // Animations
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    const cards = listRef.current?.querySelectorAll(".profile-section");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.15,
          delay: 0.3,
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex-1 px-6 md:px-16 py-8">
      <div
        ref={listRef}
        className="flex flex-col items-center gap-8 max-w-2xl mx-auto"
      >
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-2xl md:text-3xl font-semibold text-white/90 text-center"
        >
          Foydaluvchi ma’lumotlari
        </h1>

        {/* Profile card */}
        <div className="profile-section w-full bg-[#1E1E1E] rounded-2xl p-6 shadow-lg border border-white/10">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <Avatar
              size={96}
              icon={<UserOutlined />}
              src={userData?.data?.profileImageUrl}
              className="border-2 border-white/20"
            />
            <p className="mt-3 text-white/80 text-lg font-medium">
              {userData?.data?.firstName || "User"} {userData?.data?.lastName}
            </p>
          </div>

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
            className="space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <Form.Item
                label={<span className="text-white/70">First Name</span>}
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
                className="flex-1"
              >
                <Input
                  placeholder="Enter first name"
                  className="!bg-[#2B2B2B] !border-none !text-white !rounded-xl h-10 placeholder:!text-white/70"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-white/70">Last Name</span>}
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
                className="flex-1"
              >
                <Input
                  placeholder="Enter last name"
                  className="!bg-[#2B2B2B] !border-none !text-white !rounded-xl h-10 placeholder:!text-white/70"
                />
              </Form.Item>
            </div>

            <Form.Item
              label={<span className="text-white/70">Age</span>}
              name="age"
              rules={[
                { required: true, message: "Please enter your age" },
                // { type: "number", min: 0, message: "Age must be a positive number" },
              ]}
            >
              <Input
                placeholder="Enter age"
                className="!w-full !bg-[#2B2B2B] !border-none !text-white !rounded-xl h-10 placeholder:!text-white/70"
                min={0}
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white/70">Image</span>}
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
              <Upload
                listType="picture"
                beforeUpload={() => false}
                maxCount={1}
                className="!text-white"
              >
                <Button
                  icon={<UploadOutlined />}
                  className="!bg-[#2B2B2B] !border-none !text-white hover:!bg-[#3A3A3A]"
                >
                  Rasm yuklash
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isUpdating}
                disabled={isUserLoading}
                className="!bg-blue-600 hover:!bg-blue-700 !h-11 !text-base !rounded-xl"
              >
                Saqlash
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
