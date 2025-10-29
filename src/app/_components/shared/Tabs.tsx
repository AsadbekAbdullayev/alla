import React from "react";
import { Tabs } from "antd";
import {
  FileTextOutlined,
  InboxOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./style.css";
const App = () => {
  const items = [
    {
      key: "1",
      label: (
        <p className="flex items-center gap-2 text-[#FFFFFF80] font-bold italic">
          Filmlar
        </p>
      ),
      children: null,
    },
    {
      key: "2",
      label: (
        <p className="flex items-center gap-2 text-[#FFFFFF80] font-bold italic">
          Seriallar
        </p>
      ),
      children: null,
    },
  ];

  return (
    <div className="custom-tabs">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default App;
