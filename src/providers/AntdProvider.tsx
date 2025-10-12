"use client";
import { ConfigProvider } from "antd";
import { ReactNode } from "react";

export const AntdProvider = ({ children }: { children: ReactNode }) => {
  return <ConfigProvider>{children}</ConfigProvider>;
};
