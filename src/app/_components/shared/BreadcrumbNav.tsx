"use client";
import React, { memo } from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

const Separator: React.FC = () => (
  <svg
    width="6"
    height="10"
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="m-2 shrink-0"
  >
    <path
      d="M1 9L5 5L1 1"
      stroke="#FFFFFF80"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BreadcrumbNav: React.FC = () => {
  const textClasses =
    "!text-[#8d8d8e] hover:underline font-nunito text-[16px] italic font-extrabold leading-[26px] tracking-[0.2px] transition-colors whitespace-nowrap";
  const breadcrumbs = useSelector(
    (state: RootState) => state.generel.breadcrumb
  );

  const breadcrumbItems = breadcrumbs.map((item, index) => {
    const isLast = index === breadcrumbs.length - 1;

    return {
      title: isLast ? (
        <p className="!text-white font-nunito text-[16px] italic font-extrabold leading-[26px] tracking-[0.2px] whitespace-nowrap">
          {item.title}
        </p>
      ) : (
        <Link href={item.href || ""} className={textClasses}>
          {item.title}
        </Link>
      ),
    };
  });

  return (
    <div className="w-full overflow-x-auto scrollbar-track-transparent">
      <Breadcrumb
        separator={<Separator />}
        items={breadcrumbItems}
        className="flex !text-white min-w-max"
      />
    </div>
  );
};

export default memo(BreadcrumbNav);
