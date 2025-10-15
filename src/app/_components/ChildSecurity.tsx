'use-client'

import React from "react";

const ChildSecurity = () => {
  const security = [
    {
      id: 1,
      title: "Faol nazorat",
      desc: "Platformada har bir kontent mutaxassislar tomonidan tekshiriladi. Zararli, bolalarga yaramaydigan materiallarga qat’iy yo‘l qo‘yilmaydi.",
      icon: "/assets/icons/security.svg",
    },
    {
      id: 2,
      title: "Yoshga mos filtrlash",
      desc: "Farzandingizning yoshi bo‘yicha moslangan maxsus filtrlar yordamida unga faqat tarbiyaviy va qiziqarli kontent ko‘rsatiladi.",
      icon: "/assets/icons/security2.svg",
    },
    {
      id: 3,
      title: "Ota-onalar boshqaruvi",
      desc: "Ota-onalar bolalarning ko‘rish vaqtini nazorat qilishlari, istalgan vaqtda cheklovlar qo‘yishlari mumkin.",
      icon: "/assets/icons/security3.svg",
    },
    {
      id: 4,
      title: "Xavfsiz media muhiti ",
      desc: "Alla – bu reklamalarsiz, zo‘ravonlik va nomaqbul obrazlarsiz maxsus bolajonlar maydoni.",
      icon: "/assets/icons/security4.svg",
    },
    {
      id: 5,
      title: "Ishonchli kontent",
      desc: "Har bir multfilm, qo‘shiq yoki o‘quv materiali bolaning rivojlanishiga ijobiy ta’sir ko‘rsatishga qaratilgan.",
      icon: "/assets/icons/security5.svg",
    },
  ];
  return (
    <div className="p-[120px] w-full flex flex-col items-center relative">
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
              className={`p-6 bg-[#436EFF45] max-w-[309px] w-full min-h-[262px] ${
                item?.id === 1 ? "-rotate-[4deg] " : ""
              }`}
            >
              <img
                src={item.icon}
                alt=""
                className={`${item?.id === 1 && "rotate-[4deg]"}`}
              />
              <h2 className="text-white text-[24px] font-[700] leading-[28px] pt-[24px]">
                {item.title}
              </h2>
              <p className="text-[#FFFFFFCC] text-[16px] font-[500] pt-[10px] leading-[100%]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-[24px] pt-[24px]">
          {security.slice(3, 5).map((item) => (
            <div
              key={item.id}
              className={`p-6 bg-[#436EFF45] max-w-[484px] w-full min-h-[262px]`}
            >
              <img src={item.icon} alt="" />
              <h2 className="text-white text-[24px] font-[700] leading-[28px] pt-[24px]">
                {item.title}
              </h2>
              <p className="text-[#FFFFFFCC] text-[16px] font-[500] pt-[24px] leading-[130%]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <img src="/assets/icons/tree.svg" alt="" className="absolute top-0 right-0" />
      <img src="/assets/icons/knight.svg" alt="" className="absolute top-[89px] left-[81px]" />
    </div>
  );
};

export default ChildSecurity;
