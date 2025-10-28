// app/profile/layout.tsx
"use client";
import ProfileSider from "@/app/_components/ProfileSidebar";
import ProfileHeader from "@/app/_components/ProfileHeader";
import ProfileFooter from "@/app/_components/ProfileFooter";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#07080d] p-3 relative text-white flex h-screen gap-5 overflow-hidden">
      <ProfileSider />
      {/* max-w-[calc(100%-250px)] */}
      <div className="flex flex-col flex-1  h-full overflow-hidden rounded-[24px] relative">
        <ProfileHeader />
        <main className="bg-[#1c1c1e]  overflow-y-auto overflow-hidden flex-1 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-[#1c1c1e] hover:scrollbar-thumb-[#555]">
          {children}
        </main>
        <ProfileFooter />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="222"
          height="207"
          viewBox="0 0 222 207"
          fill="none"
          className="absolute z-[10] right-[-150px] top-[-60px]"
          style={{
            fill: "radial-gradient(50% 50% at 50% 50%, #A580E9 0%, rgba(224, 127, 175, 0.00) 100%)",
            filter: "blur(50px)",
          }}
        >
          <g filter="url(#filter0_f_862_3405)">
            <circle
              cx="42"
              cy="27"
              r="80"
              fill="url(#paint0_radial_862_3405)"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_862_3405"
              x="-138"
              y="-153"
              width="360"
              height="360"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="50"
                result="effect1_foregroundBlur_862_3405"
              />
            </filter>
            <radialGradient
              id="paint0_radial_862_3405"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(42 27) rotate(90) scale(80)"
            >
              <stop stopColor="#A580E9" />
              <stop offset="1" stopColor="#E07FAF" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="222"
        height="207"
        viewBox="0 0 222 207"
        fill="none"
        className="absolute z-[10] bottom-[-150px] left-[-100px]"
        style={{
          fill: "radial-gradient(50% 50% at 50% 50%, #A580E9 0%, rgba(224, 127, 175, 0.00) 100%)",
          filter: "blur(50px)",
        }}
      >
        <g filter="url(#filter0_f_862_3405)">
          <circle cx="42" cy="27" r="80" fill="url(#paint0_radial_862_3405)" />
        </g>
        <defs>
          <filter
            id="filter0_f_862_3405"
            x="-138"
            y="-153"
            width="360"
            height="360"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="50"
              result="effect1_foregroundBlur_862_3405"
            />
          </filter>
          <radialGradient
            id="paint0_radial_862_3405"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(42 27) rotate(90) scale(80)"
          >
            <stop stopColor="#A580E9" />
            <stop offset="1" stopColor="#E07FAF" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
