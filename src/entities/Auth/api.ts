import request from "@/services/api";
import { useMutation } from "react-query";

interface SendOtpResponse {
  success: boolean;
  message: string;
  data?: {
    otpSent: boolean;
    phoneNumber: string;
  };
}

interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data?: {
    verified: boolean;
    token?: string;
  };
}

interface SendOtpBody {
  phoneNumber: string;
}

interface VerifyOtpBody {
  phoneNumber: string;
  otpCode: string;
}

// ======== Send OTP ========
const sendOtp = async (body: SendOtpBody): Promise<SendOtpResponse> => {
  const { data } = await request.post<SendOtpResponse>("/auth/send-otp", body);
  return data;
};

export const useSendOtp = () => {
  return useMutation({
    mutationFn: sendOtp,
  });
};

// ======== Verify OTP ========
const verifyOtp = async (body: VerifyOtpBody): Promise<any> => {
  const { data } = await request.post<any>("/auth/verify-otp", body);
  return data;
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
  });
};
