import { useVerifyOtp } from "@/entities/Auth/api";
import { Button, Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const OTP_TIMER_DURATION = 2 * 60 * 1000; // 2 minutes in ms
const STORAGE_KEY = "otp_expiry_time";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const OtpCard: React.FC<Props> = ({ onNext, onBack }) => {
  const [form] = Form.useForm();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120 seconds
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const { mutateAsync: verifyOtp, isLoading: isOtpVerifying } = useVerifyOtp();
  const router = useRouter();

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

  // ===== Functions =====
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input automatically
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmitOtpVerification = () => {
    const formData = {
      phoneNumber: sessionStorage.getItem("phoneNumber") || "",
      otpCode: otp.join(""),
    };
    verifyOtp(
      { phoneNumber: formData.phoneNumber, otpCode: formData.otpCode },
      {
        onSuccess: (data) => {
          if (formData.phoneNumber == "+998901234567") {
            sessionStorage.setItem("token", data.data?.token || "");
            toast.success(`OTP muvaffaqiyatli tasdiqlandi!`, {
              position: "top-right",
            });

            router.push(`/dashboard`);
          } else if (data?.data?.firstName) {
            sessionStorage.setItem("token", data.data?.token || "");
            toast.success(`OTP muvaffaqiyatli tasdiqlandi!`, {
              position: "top-right",
            });
            router.push(`/profile`);
          } else {
            onNext();
            sessionStorage.setItem("token", data.data?.token || "");
            toast.success(`OTP muvaffaqiyatli tasdiqlandi!`, {
              position: "top-right",
            });
          }
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message, {
            position: "top-right",
          });
        },
      }
    );
  };

  useEffect(() => {
    const storedExpiry = localStorage.getItem(STORAGE_KEY);
    let expiryTime: number;

    if (storedExpiry && Date.now() < Number(storedExpiry)) {
      expiryTime = Number(storedExpiry);
    } else {
      expiryTime = Date.now() + OTP_TIMER_DURATION;
      localStorage.setItem(STORAGE_KEY, expiryTime.toString());
    }

    const updateTimer = () => {
      const remaining = expiryTime - Date.now();
      if (remaining <= 0) {
        setTimeLeft(0);
        localStorage.removeItem(STORAGE_KEY);
      } else {
        setTimeLeft(remaining);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const maskedPhone =
    "+998 ** *** " +
    sessionStorage.getItem("phoneNumber")?.slice(-4, -2) +
    " " +
    sessionStorage.getItem("phoneNumber")?.slice(-2);

  return (
    <div className="bg-[#436EFF45] max-w-[500px] w-full p-8 rounded-[32px] border border-[33CEFF] flex flex-col items-center">
      <h2 className="text-white text-[28px] font-[800] text-center">
        Tasdiqlash kodini kiriting
      </h2>
      <p className="text-[#FFFFFFCC] text-[14px] leading-[20px] font-[500] text-center pt-3">
        Kod {maskedPhone} raqamiga yuborildi
      </p>
      <Form form={form} layout="vertical" className="w-full pt-[48px]">
        <Form.Item
          className="w-full  m-0"
          label={
            <p className="text-[#FFFFFFCC] text-[14px] font-[500]">
              Tasdiqlash kodi
            </p>
          }
        >
          {otp.map((digit, i) => (
            <Input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el?.input ?? null;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-[66px] h-[52] mx-[3px] rounded-[16px] text-center text-white text-[18px] font-semibold !bg-[#2C2EA1] border border-white"
            />
          ))}
        </Form.Item>
        {timeLeft > 0 ? (
          <p className="text-white font-[500] text-[14px] mt-2">
            Kod amal qiladi :{" "}
            <span className="text-[#04B55F] font-[900] ">
              {" "}
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </p>
        ) : (
          <p className="text-[#04B55F] font-[900] mt-2 text-[14px]">
            Qaytdan yuborish
          </p>
        )}
        <Form.Item shouldUpdate className="pt-[48px] m-0">
          {() => (
            <>
              <Button
                disabled={!otp.every((digit) => digit !== "")}
                onClick={handleSubmitOtpVerification}
                loading={isOtpVerifying}
                className="border-none text-[20px] w-full h-[52px] rounded-full !text-white font-[900] disabled:opacity-50"
                style={{
                  background:
                    "linear-gradient(90deg, #A580E9 0%, #E07FAF 100%)",
                  boxShadow:
                    "-1px -4px 0px 0px #0000001C inset, 1px 1px 1px 0px #FF8A8C4D inset",
                }}
                //   onClick={handleSubmitPhoneNumber}
              >
                Davom etish
                {buttonItem1}
                {buttonItem2}
              </Button>
              <Button
                type="link"
                onClick={() => {
                  onBack(), sessionStorage.removeItem("phoneNumber");
                }}
                className="!text-white h-fit p-0 font-[800] text-[17px] text-center w-full mt-[20px] hover:underline"
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.07 5.92993L4 11.9999L10.07 18.0699M21 11.9999H4.17"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Raqamni o’zgartirish
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default OtpCard;
