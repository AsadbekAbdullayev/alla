"use client";
import { usePathname } from "next/navigation";
// const Separator = () => (
//   <svg
//     width="6"
//     height="10"
//     viewBox="0 0 6 10"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className="mx-2"
//   >
//     <path
//       d="M1 9L5 5L1 1"
//       stroke="#FFFFFF80"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

export default function AdminHeader() {
  const pathname = usePathname();
  const getHeaderTitle = (path: string): string => {
    if (path === "/") {
      return "Bosh sahifa";
    }
    if (path.includes("/profile/books")) {
      return "Kitoblar";
    }

    if (path.includes("/profile/user")) {
      return "Foydaluvchi ma'lumotlari";
    }
    return "Bosh sahifa";
  };

  const currentTitle = getHeaderTitle(pathname);

  const textClasses = `font-nunito text-[20px] italic font-extrabold leading-[26px] tracking-[0.2px] transition-colors  `;
  return (
    <header className="bg-[#1c1c1e] px-6 rounded-t-[24px] h-[70px] shadow-md flex flex-col justify-center items-start">
      <div className="text-gray-400 flex gap-2 items-center h-[69px]">
        <div className="p-1 rounded-md bg-[linear-gradient(90deg,#A580E9_0%,#E07FAF_100%)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M17.3583 6.67498L11.9 2.30831C10.8333 1.45831 9.16667 1.44997 8.10834 2.29997L2.65 6.67498C1.86667 7.29998 1.39167 8.54997 1.55834 9.53331L2.60834 15.8166C2.85 17.225 4.15834 18.3333 5.58334 18.3333H14.4167C15.825 18.3333 17.1583 17.2 17.4 15.8083L18.45 9.52497C18.6 8.54997 18.125 7.29998 17.3583 6.67498ZM10.625 15C10.625 15.3416 10.3417 15.625 10 15.625C9.65834 15.625 9.375 15.3416 9.375 15V12.5C9.375 12.1583 9.65834 11.875 10 11.875C10.3417 11.875 10.625 12.1583 10.625 12.5V15Z"
              fill="white"
            />
          </svg>
        </div>
        <p className={textClasses}>{currentTitle}</p>
        {/* {breadcrumbItems.map((item: any, index: number) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isLink = !!item.href && !isLast;

         

          return (
            <div key={item.title + index} className="flex items-center">
              {isLink ? (
                <Link href={item.href} className={textClasses}>
                  {item.title}
                </Link>
              ) : (
                <p className={textClasses}>{item.title}</p>
              )}
              {!isLast && <Separator />}
            </div>
          );
        })} */}
      </div>
      <div className="w-full h-[1px] bg-[#FFFFFF1A]"></div>
    </header>
  );
}
