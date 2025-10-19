"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ReactNode, Suspense } from "react";
import { ConfigProvider, theme } from "antd";
import { ToastContainer } from "react-toastify";
import Loading from "../app/loading";

export const AntdProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      <AntdRegistry>
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <ToastContainer
            position="top-right"
            hideProgressBar={true}
            autoClose={10000}
            newestOnTop={false}
            closeOnClick={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="dark"
          />
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </Suspense>
  );
};
