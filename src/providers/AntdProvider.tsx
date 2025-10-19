"use client";
import { ConfigProvider, theme } from "antd";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export const AntdProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
      {children}
    </ConfigProvider>
  );
};
