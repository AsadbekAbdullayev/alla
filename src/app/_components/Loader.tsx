import React from "react";
import { Spin } from "antd";

interface LoaderProps {
  size?: number;
}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div
      className={`w-full h-screen bg-slate-100 flex items-center justify-center `}
    >
      <Spin size="large" />
    </div>
  );
};

export default Loader;
