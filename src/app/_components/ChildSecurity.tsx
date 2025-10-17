"use-client";

import { useSearchParams } from "next/navigation";
import React from "react";

const ChildSecurity = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const isDark = theme === "dark";
  const security = [
    {
      id: 1,
      title: "Faol nazorat",
      desc: "Platformada har bir kontent mutaxassislar tomonidan tekshiriladi. Zararli, bolalarga yaramaydigan materiallarga qat’iy yo‘l qo‘yilmaydi.",
      icon: isDark ? "/assets/icons/security.svg" : "/assets/icons/securityLight.svg",
    },
    {
      id: 2,
      title: "Yoshga mos filtrlash",
      desc: "Farzandingizning yoshi bo‘yicha moslangan maxsus filtrlar yordamida unga faqat tarbiyaviy va qiziqarli kontent ko‘rsatiladi.",
      icon: isDark ? "/assets/icons/security2.svg" : "/assets/icons/securityLight2.svg",
    },
    {
      id: 3,
      title: "Ota-onalar boshqaruvi",
      desc: "Ota-onalar bolalarning ko‘rish vaqtini nazorat qilishlari, istalgan vaqtda cheklovlar qo‘yishlari mumkin.",
      icon: isDark ? "/assets/icons/security3.svg" : "/assets/icons/securityLight3.svg",
    },
    {
      id: 4,
      title: "Xavfsiz media muhiti ",
      desc: "Alla – bu reklamalarsiz, zo‘ravonlik va nomaqbul obrazlarsiz maxsus bolajonlar maydoni.",
      icon: isDark ? "/assets/icons/security4.svg" : "/assets/icons/securityLight4.svg",
    },
    {
      id: 5,
      title: "Ishonchli kontent",
      desc: "Har bir multfilm, qo‘shiq yoki o‘quv materiali bolaning rivojlanishiga ijobiy ta’sir ko‘rsatishga qaratilgan.",
      icon: isDark ? "/assets/icons/security5.svg" : "/assets/icons/securityLight5.svg",
    },
  ];
  return (
    <div className={`p-[120px] w-full flex flex-col items-center relative  ${isDark ? '' : 'bg-gradient-to-b from-[#F2F6F5] to-[#C2D9C6]'}`}>
      <div>
        <h2 className="text-white text-[48px] font-[800] leading-[56px] text-center">
          Bolalar xavfsizligi
        </h2>
        <p className="text-[#FFFFFFCC] text-[20px] leading-[28px] font-[500] text-center max-w-[700px] pt-[20px]">
          Alla platformasida farzandingiz faqat xavfsiz, foydali va yoshiga mos
          kontentni ko‘radi – zararli materiallarga bu yerda joy yo‘q.
        </p>
      </div>
      <div>
        <div className="flex gap-[24px] pt-[80px] justify-end pb-[24px]">
          {security.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className={`p-6 ${isDark ? 'bg-[#436EFF45]' : 'bg-white'} max-w-[309px] w-full min-h-[262px] ${
                item?.id === 1 ? "-rotate-[4deg] " : ""
              }`}
            >
              <img
                src={item.icon}
                alt=""
                className={`${item?.id === 1 && "rotate-[4deg]"}`}
              />
              <h2 className={`text-[24px] font-[700] leading-[28px] pt-[24px] ${isDark ? "text-white" : "text-[#505050]"}`}>
                {item.title}
              </h2>
              <p className={`text-[16px] font-[500] pt-[10px] leading-[100%] ${isDark ? "text-[#FFFFFFCC]" : "text-[#505050CC]"}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-[24px] pt-[24px]">
          {security.slice(3, 5).map((item) => (
            <div
              key={item.id}
              className={`p-6 ${isDark ? 'bg-[#436EFF45]' : 'bg-white'} max-w-[484px] w-full min-h-[262px]`}
            >
              <img src={item.icon} alt="" />
              <h2 className={`text-[24px] font-[700] leading-[28px] pt-[24px] ${isDark ? "text-white" : "text-[#505050]"}`}>
                {item.title}
              </h2>
              <p className={`text-[16px] font-[500] pt-[24px] leading-[130%] ${isDark ? "text-[#FFFFFFCC]" : "text-[#505050CC]"}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <img
        src={isDark ? "/assets/icons/tree.svg" : "/assets/icons/treeLight.svg"}
        alt=""
        className="absolute top-0 right-0"
      />
      <img
        src="/assets/icons/knight.svg"
        alt=""
        className="absolute top-[89px] left-[81px]"
      />
    </div>
  );
};

export default ChildSecurity;
