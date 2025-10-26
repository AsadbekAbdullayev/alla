"use client";

import { useSendOtp } from "@/entities/Auth/api";
import { Button, Form, Input } from "antd";
import React, { useCallback } from "react";
import { toast } from "react-toastify";

type Props = {
  onNext: () => void;
};

const PhoneNumberCard: React.FC<Props> = ({ onNext }) => {
  const [form] = Form.useForm();
  const { mutateAsync: sendOtp, isLoading: isOtpSending } = useSendOtp();

  const buttonItem1 = (
    <svg
      className="absolute top-2 left-2"
      width="8"
      height="9"
      viewBox="0 0 8 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <path
          d="M4.27622 0.434591C5.08565 -0.105326 6.73702 -0.216113 7.49941 0.529865C8.19856 1.48249 6.59389 2.13311 5.86364 3.60948C5.13339 5.08585 2.65716 5.13347 2.54604 3.41898C2.43492 1.70449 3.46679 0.974508 4.27622 0.434591Z"
          fill="white"
        />
        <path
          d="M1.60363 8.8842C0.778402 8.96357 0.015875 8.40795 0 7.2332C0.110551 5.58221 1.98494 5.51871 2.54057 6.53471C3.09619 7.5507 2.42887 8.80482 1.60363 8.8842Z"
          fill="white"
        />
      </g>
    </svg>
  );

  const buttonItem2 = (
    <svg
      className="absolute top-[4px] right-1.5"
      width="28"
      height="16"
      viewBox="0 0 28 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.49">
        <path
          d="M10.121 2.59092C17.622 2 24.123 9 25.1227 14.0002M4.1211 2.59093L2.19811 2.59093"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );

  const formatNumber = useCallback((value: string): string => {
    const numericValue = value?.replace(/\D/g, "");
    return numericValue
      ? `+${numericValue.slice(0, 3)} ${numericValue.slice(
          3,
          5
        )} ${numericValue.slice(5, 8)} ${numericValue.slice(
          8,
          10
        )} ${numericValue.slice(10, 12)}`
      : "";
  }, []);

  const handleSubmitPhoneNumber = () => {
    const phoneNumber = form.getFieldValue("phoneNumber").replace(/\s/g, "");
    if (!phoneNumber) return;

    sendOtp(
      { phoneNumber: phoneNumber },
      {
        onSuccess: (res: any) => {
          localStorage.setItem("phoneNumber", phoneNumber);
          toast.success(`${res.message}: ${res.data}`, {
            position: "top-right",
          });
          onNext();
        },
        onError: (error: any) => {
          console.log(error, "error");
          toast.error(error.response?.data?.message, {
            position: "top-right",
          });
        },
      }
    );
  };

  return (
    <div className="bg-[#436EFF45]  max-w-[500px] w-full p-8 rounded-[32px] border border-[33CEFF] relative z-30 max-lg:backdrop-blur-sm">
      <h2 className="text-white text-[28px] font-[800] text-center">
        Boshlash uchun tizimga kiring
      </h2>
      <p className="text-[#FFFFFFCC] text-[14px] leading-[20px] font-[500] text-center pt-3">
        Davom etish orqali siz{" "}
        <span className="text-[#1EB53A]">Foydalanish shartlariga </span> rozilik
        bildirishingiz hamda{" "}
        <span className="text-[#1EB53A]">Maxfiylik siyosati</span> bilan
        tanishganingizni tasdiqlaysiz.
      </p>
      <Form form={form} layout="vertical" className="pt-[48px]">
        <Form.Item
          name={"phoneNumber"}
          label={
            <p className="text-[#FFFFFFCC] text-[14px] font-[500]">
              Telefon raqamingizni kiriting
            </p>
          }
          getValueFromEvent={(e) => {
            return formatNumber(e.target.value);
          }}
        >
          <Input
            placeholder="+998 91 123 45 67"
            className="!bg-transparent text-white h-[50px] rounded-[99px] px-[16px] py-[14px] placeholder:text-[#FFFFFF66] text-[18px] font-[500] "
            style={{ fontFamily: "Nunito", background: "transparent" }}
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              disabled={
                !form.getFieldValue("phoneNumber") ||
                form.getFieldValue("phoneNumber").replace(/\s/g, "").length !==
                  13
              }
              loading={isOtpSending}
              className="border-none w-full h-[52px] rounded-full !text-white text-[17px] font-[800] disabled:opacity-50"
              style={{
                background: "linear-gradient(90deg, #A580E9 0%, #E07FAF 100%)",
                boxShadow:
                  "-1px -4px 0px 0px #0000001C inset, 1px 1px 1px 0px #FF8A8C4D inset",
              }}
              onClick={handleSubmitPhoneNumber}
            >
              Davom etish
              {buttonItem1}
              {buttonItem2}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default PhoneNumberCard;
