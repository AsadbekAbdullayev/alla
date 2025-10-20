"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App as AntdApp, theme } from "antd";
import { ReactNode, Suspense } from "react";
import Loading from "../app/loading";

export const AntdProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      <AntdRegistry>
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <AntdApp>{children}</AntdApp>
        </ConfigProvider>
      </AntdRegistry>
    </Suspense>
  );
};
