import { Button, Form, Input } from "antd";
import React from "react";
type Props = {
  onBack: () => void;
};

const UserAuth: React.FC<Props> = ({ onBack }) => {
  const [form] = Form.useForm();

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
          stroke-width="4"
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
  return (
    <div className="bg-[#436EFF45] max-w-[500px] w-full p-8 rounded-[32px] border border-[33CEFF] ">
      <h2 className="text-white text-[28px] font-[800] text-center">
        Ismingizni yozing
      </h2>
      <p className="text-[#FFFFFFCC] text-[14px] leading-[20px] font-[500] text-center pt-3">
        Kelgusida ilovadan foydalanish jarayonini yanada qulaylashtirish
        maqsadida
      </p>
      <Form form={form} layout="vertical" className="pt-[48px]">
        <Form.Item
          name={"userName"}
          label={
            <p className="text-[#FFFFFFCC] text-[14px] font-[500]">
              Ismingizni kiriting
            </p>
          }
        >
          <Input
            placeholder=""
            className="!bg-transparent text-white h-[50px] rounded-[99px] px-[16px] py-[14px] placeholder:text-[#FFFFFF66] text-[18px] font-[500] "
            style={{ fontFamily: "Nunito", background: "transparent" }}
          />
        </Form.Item>
        <Form.Item shouldUpdate className="pt-[48px] m-0">
          {() => (
            <>
              <Button
                disabled={!form.getFieldValue("userName")}
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
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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

export default UserAuth;
