// components/PhoneNumberInput.tsx
import React from "react";
import { Input } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

interface PhoneNumberInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value = "",
  onChange,
  placeholder = "90 123 45 67",
}) => {
  const formatPhoneNumber = (input: string): string => {
    // Faqat raqamlarni qoldirish
    const numbers = input.replace(/\D/g, "");

    // Agar +998 dan boshlanmasa, +998 ni qo'shamiz
    if (!numbers.startsWith("998")) {
      return `+998 ${numbers.slice(0, 2)} ${numbers.slice(
        2,
        5
      )} ${numbers.slice(5, 7)} ${numbers.slice(7, 9)}`.trim();
    } else {
      // Agar 998 dan boshlansa, + qo'shamiz
      const without998 = numbers.slice(3);
      return `+998 ${without998.slice(0, 2)} ${without998.slice(
        2,
        5
      )} ${without998.slice(5, 7)} ${without998.slice(7, 9)}`.trim();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);

    if (onChange) {
      // API ga yuborish uchun faqat raqamlarni saqlaymiz (+998901234567 formatda)
      const numbersOnly = formatted.replace(/\D/g, "");
      onChange(`+${numbersOnly}`);
    }
  };

  const displayValue = value ? formatPhoneNumber(value) : "";

  return (
    <Input
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
      prefix={<PhoneOutlined className="text-gray-400" />}
      maxLength={20} // Formatlangan holatda maksimal uzunlik
    />
  );
};
