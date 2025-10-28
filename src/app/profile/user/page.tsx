"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGetUser, useUpdateUser } from "@/entities/Profile/api";
import { Button, Form, Input, message } from "antd";
import { gsap } from "gsap";

export default function ProfilePage() {
  const [form] = Form.useForm();
  const listRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const { data: userData, isLoading: isUserLoading } = useGetUser();
  const [editableField, setEditableField] = useState<string | null>(null);
  const { mutateAsync: updateUser, isLoading: isUpdating } = useUpdateUser();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      // Optionally update form field
      form.setFieldValue("profileImageUrl", file);
      console.log('profileImageUrl',url);
      
    }
  };

  // Trigger file input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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
        profileImageUrl: imageUrl, // ✅ only send URL, yag'eee
      };

      await updateUser(payload);
      message.success("Profil muvaffaqiyatli yangilandi!");
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
        phoneNumber: userData.data.phoneNumber,
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
        <div className="flex flex-col items-end relative">
          {/* Avatar container */}
          <div
            onClick={handleUploadClick}
            className="w-[110px] h-[108px] rounded-full bg-[#04B55F] flex items-center justify-center text-[48px] font-[700] cursor-pointer overflow-hidden"
          >
            {imageUrl || userData?.data?.profileImageUrl ? (
              <img
                src={imageUrl || userData?.data?.profileImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              userData?.data?.firstName?.charAt(0)
            )}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Upload button */}
          <Button
            onClick={handleUploadClick}
            className="p-2 rounded-[12px] w-9 h-9 border border-[#FFFFFF1A] mt-[-33px]"
            style={{ background: "#1C1C1E" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.96445 0.833377C7.9709 0.833379 7.9774 0.83338 7.98397 0.83338L12.0349 0.833377C12.1268 0.833355 12.2066 0.833335 12.2829 0.837953C13.2469 0.896337 14.0911 1.50478 14.4513 2.40088C14.4798 2.47176 14.5051 2.54756 14.5341 2.6347L14.5403 2.65319C14.5789 2.76917 14.5873 2.79315 14.5944 2.81088C14.7145 3.10958 14.9959 3.31239 15.3172 3.33186C15.3361 3.333 15.3644 3.33338 15.495 3.33338C15.5108 3.33338 15.5263 3.33338 15.5416 3.33337C15.804 3.33332 15.9967 3.33328 16.1617 3.34962C17.7427 3.50627 18.9935 4.75701 19.1501 6.33806C19.1664 6.50295 19.1664 6.68798 19.1664 6.93784C19.1664 6.95203 19.1664 6.96644 19.1664 6.98107V13.5345C19.1664 14.2053 19.1664 14.7589 19.1295 15.2099C19.0913 15.6783 19.0091 16.1089 18.803 16.5133C18.4835 17.1406 17.9735 17.6505 17.3463 17.9701C16.9419 18.1761 16.5113 18.2583 16.0429 18.2966C15.5919 18.3334 15.0383 18.3334 14.3675 18.3334H5.63192C4.96112 18.3334 4.40749 18.3334 3.9565 18.2966C3.48808 18.2583 3.0575 18.1761 2.65305 17.9701C2.02584 17.6505 1.51591 17.1406 1.19633 16.5133C0.990255 16.1089 0.908118 15.6783 0.869847 15.2099C0.833 14.7589 0.833008 14.2053 0.833019 13.5345L0.833019 6.98107C0.833019 6.96644 0.833016 6.95204 0.833013 6.93784C0.832962 6.68799 0.832924 6.50295 0.849261 6.33806C1.00591 4.75701 2.25665 3.50627 3.8377 3.34962C4.00263 3.33328 4.19541 3.33332 4.45779 3.33337C4.47307 3.33338 4.48858 3.33338 4.50434 3.33338C4.63501 3.33338 4.66329 3.333 4.68213 3.33186C5.00347 3.31239 5.28487 3.10958 5.40495 2.81088C5.41207 2.79315 5.42046 2.76917 5.45912 2.65319C5.46119 2.64695 5.46325 2.64078 5.46529 2.63466C5.49431 2.54754 5.51955 2.47175 5.54804 2.40088C5.90828 1.50478 6.75246 0.896337 7.71649 0.837953C7.79273 0.833335 7.87262 0.833355 7.96445 0.833377ZM7.98397 2.50005C7.86172 2.50005 7.83631 2.50042 7.81724 2.50157C7.4959 2.52103 7.21451 2.72385 7.09442 3.02255C7.0873 3.04027 7.07892 3.06426 7.04026 3.18024C7.03818 3.18647 7.03612 3.19265 7.03408 3.19877C7.00507 3.28589 6.97982 3.36168 6.95133 3.43255C6.59109 4.32864 5.74691 4.93709 4.78288 4.99547C4.7066 5.0001 4.62295 5.00007 4.52571 5.00005C4.51866 5.00005 4.51154 5.00005 4.50434 5.00005C4.17535 5.00005 4.07338 5.0011 4.00203 5.00817C3.2115 5.08649 2.58613 5.71186 2.50781 6.50239C2.50071 6.57402 2.49969 6.66919 2.49969 6.98107V13.5C2.49969 14.2139 2.50033 14.6991 2.53098 15.0742C2.56083 15.4395 2.61493 15.6264 2.68134 15.7567C2.84113 16.0703 3.0961 16.3253 3.4097 16.4851C3.54004 16.5515 3.72687 16.6056 4.09222 16.6354C4.46729 16.6661 4.95254 16.6667 5.66635 16.6667H14.333C15.0468 16.6667 15.5321 16.6661 15.9072 16.6354C16.2725 16.6056 16.4593 16.5515 16.5897 16.4851C16.9033 16.3253 17.1582 16.0703 17.318 15.7567C17.3844 15.6264 17.4385 15.4395 17.4684 15.0742C17.499 14.6991 17.4997 14.2139 17.4997 13.5V6.98107C17.4997 6.66919 17.4987 6.57402 17.4916 6.50239C17.4132 5.71186 16.7879 5.08649 15.9973 5.00817C15.926 5.0011 15.824 5.00005 15.495 5.00005L15.4737 5.00005C15.3764 5.00007 15.2928 5.0001 15.2165 4.99547C14.2525 4.93709 13.4083 4.32864 13.048 3.43255C13.0195 3.36167 12.9943 3.28586 12.9653 3.19872L12.9591 3.18024C12.9205 3.06426 12.9121 3.04027 12.9049 3.02255C12.7849 2.72385 12.5035 2.52103 12.1821 2.50157C12.1631 2.50042 12.1377 2.50005 12.0154 2.50005H7.98397ZM9.99969 7.91671C8.61897 7.91671 7.49969 9.036 7.49969 10.4167C7.49969 11.7974 8.61897 12.9167 9.99969 12.9167C11.3804 12.9167 12.4997 11.7974 12.4997 10.4167C12.4997 9.036 11.3804 7.91671 9.99969 7.91671ZM5.83302 10.4167C5.83302 8.11553 7.6985 6.25005 9.99969 6.25005C12.3009 6.25005 14.1664 8.11553 14.1664 10.4167C14.1664 12.7179 12.3009 14.5834 9.99969 14.5834C7.6985 14.5834 5.83302 12.7179 5.83302 10.4167Z"
                fill="#606060"
              />
            </svg>
          </Button>
        </div>

        {/* Profile card */}
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="max-w-[474px] w-full"
        >
          <Form.Item
            name={"firstName"}
            label={
              <p className="text-[#FFFFFFCC] text-[13px]  font-[400]">Ism</p>
            }
          >
            <Input
              readOnly={editableField !== "firstName"}
              className="h-[48px] !bg-[#252527] border-[#252527] w-full rounded-xl placeholder:!text-white/50 text-white text-[15px] font-[500]"
              placeholder="Ismingizni kiriting"
              style={{ font: "Nunito" }}
              suffix={
                <svg
                  onClick={() =>
                    setEditableField((prev) =>
                      prev === "firstName" ? null : "firstName"
                    )
                  }
                  className="cursor-pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_1525_3092"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    <rect width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_1525_3092)">
                    <path
                      d="M4 24.0001C3.45 24.0001 2.97933 23.8044 2.588 23.4131C2.196 23.0211 2 22.5501 2 22.0001C2 21.4501 2.196 20.9791 2.588 20.5871C2.97933 20.1957 3.45 20.0001 4 20.0001H20C20.55 20.0001 21.021 20.1957 21.413 20.5871C21.8043 20.9791 22 21.4501 22 22.0001C22 22.5501 21.8043 23.0211 21.413 23.4131C21.021 23.8044 20.55 24.0001 20 24.0001H4ZM5 18.0001C4.71667 18.0001 4.479 17.9041 4.287 17.7121C4.09567 17.5207 4 17.2834 4 17.0001V14.6751C4 14.5417 4.025 14.4124 4.075 14.2871C4.125 14.1624 4.2 14.0501 4.3 13.9501L13.05 5.20006L16.8 8.95006L8.05 17.7001C7.95 17.8001 7.83767 17.8751 7.713 17.9251C7.58767 17.9751 7.45833 18.0001 7.325 18.0001H5ZM6 16.0001H6.9L14 8.95006L13.05 8.00006L6 15.1001V16.0001ZM17.925 7.85006L14.175 4.10006L15.975 2.30006C16.1583 2.10006 16.3917 2.00406 16.675 2.01206C16.9583 2.02072 17.1917 2.11672 17.375 2.30006L19.725 4.65006C19.9083 4.83339 20 5.06272 20 5.33806C20 5.61272 19.9083 5.85006 19.725 6.05006L17.925 7.85006Z"
                      fill="#04B55F"
                    />
                  </g>
                </svg>
              }
            />
          </Form.Item>
          <Form.Item
            name={"phoneNumber"}
            label={
              <p className="text-[#FFFFFFCC] text-[13px]  font-[400]">
                Telefon raqam
              </p>
            }
            getValueFromEvent={(e) => {
              return formatNumber(e.target.value);
            }}
          >
            <Input
              readOnly={editableField !== "phoneNumber"}
              className="h-[48px] !bg-[#252527] border-[#252527] w-full rounded-xl placeholder:text-white/50 text-white text-[15px] font-[500]"
              placeholder="Ismingizni kiriting"
              style={{ font: "Nunito" }}
              onChange={(e) =>
                form.setFieldValue("phoneNumber", formatNumber(e.target.value))
              }
              suffix={
                <svg
                  onClick={() =>
                    setEditableField((prev) =>
                      prev === "phoneNumber" ? null : "phoneNumber"
                    )
                  }
                  className="cursor-pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_1525_3092"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    <rect width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_1525_3092)">
                    <path
                      d="M4 24.0001C3.45 24.0001 2.97933 23.8044 2.588 23.4131C2.196 23.0211 2 22.5501 2 22.0001C2 21.4501 2.196 20.9791 2.588 20.5871C2.97933 20.1957 3.45 20.0001 4 20.0001H20C20.55 20.0001 21.021 20.1957 21.413 20.5871C21.8043 20.9791 22 21.4501 22 22.0001C22 22.5501 21.8043 23.0211 21.413 23.4131C21.021 23.8044 20.55 24.0001 20 24.0001H4ZM5 18.0001C4.71667 18.0001 4.479 17.9041 4.287 17.7121C4.09567 17.5207 4 17.2834 4 17.0001V14.6751C4 14.5417 4.025 14.4124 4.075 14.2871C4.125 14.1624 4.2 14.0501 4.3 13.9501L13.05 5.20006L16.8 8.95006L8.05 17.7001C7.95 17.8001 7.83767 17.8751 7.713 17.9251C7.58767 17.9751 7.45833 18.0001 7.325 18.0001H5ZM6 16.0001H6.9L14 8.95006L13.05 8.00006L6 15.1001V16.0001ZM17.925 7.85006L14.175 4.10006L15.975 2.30006C16.1583 2.10006 16.3917 2.00406 16.675 2.01206C16.9583 2.02072 17.1917 2.11672 17.375 2.30006L19.725 4.65006C19.9083 4.83339 20 5.06272 20 5.33806C20 5.61272 19.9083 5.85006 19.725 6.05006L17.925 7.85006Z"
                      fill="#04B55F"
                    />
                  </g>
                </svg>
              }
            />
          </Form.Item>
          <Button
            htmlType="submit"
            className="w-full !h-[38px] !text-white !rounded-xl mt-[60px] hover:!shadow-[0px_5px_24px_0px_#A580E966]"
            style={{
              background: "linear-gradient(90deg, #A580E9 0%, #E07FAF 100%)",
              border: "2px solid #FFFFFF1A",
            }}
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
}
