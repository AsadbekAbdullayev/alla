// components/ModeratorForm.tsx
import React from "react";
import { Form, Input, Button, message } from "antd";
import { PhoneNumberInput } from "./PhoneNumberInput";

interface ModeratorFormProps {
  form: any;
  onFinish: (values: any) => void;
  loading?: boolean;
  isEdit?: boolean;
  initialData?: any;
}

export const ModeratorForm: React.FC<ModeratorFormProps> = ({
  form,
  onFinish,
  loading = false,
  isEdit = false,
  initialData,
}) => {
  const handleSubmit = (values: any) => {
    // Telefon raqamni tekshirish
    if (!values.phoneNumber || values.phoneNumber.length !== 13) {
      message.error("Iltimos, to‘g‘ri telefon raqam kiriting");
      return;
    }

    onFinish({
      ...values,
      role: "MODERATOR",
    });
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      className="space-y-4"
      initialValues={initialData}
    >
      <Form.Item
        name="phoneNumber"
        label="Telefon Raqam"
        rules={[
          { required: true, message: "Telefon raqamni kiriting!" },
          {
            validator: (_, value) => {
              if (!value || value.length === 13) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Telefon raqam noto‘g‘ri formatda")
              );
            },
          },
        ]}
      >
        <PhoneNumberInput placeholder="90 123 45 67" />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="Ism"
        rules={[{ required: true, message: "Ism kiriting!" }]}
      >
        <Input placeholder="Moderator ismi" />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Familiya"
        rules={[{ required: true, message: "Familiya kiriting!" }]}
      >
        <Input placeholder="Moderator familiyasi" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full"
          size="large"
        >
          {isEdit ? "Yangilash" : "Yaratish"}
        </Button>
      </Form.Item>
    </Form>
  );
};
