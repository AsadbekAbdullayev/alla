import React from 'react';
import rectangle1 from '@/assets/icons/rectangle1.svg';
import rectangle2 from '@/assets/icons/rectangle2.svg';

const Opportunitites = () => {
	const opportunity = [
		{
			id: 1,
			title: 'Faol nazorat',
			desc: 'Platformada har bir kontent mutaxassislar tomonidan tekshiriladi. Zararli, bolalarga yaramaydigan materiallarga qat’iy yo‘l qo‘yilmaydi.',
		},
	];
	return (
		<div className="p-[120px] w-full flex flex-col items-center ">
			<div>
				<h2 className="text-white text-[48px] font-[800] leading-[56px] text-center">
					Platforma imkoniyatlari
				</h2>
				<p className="text-[#FFFFFFCC] text-[20px] leading-[28px] font-[500] text-center max-w-[700px] pt-[20px]">
					Alla – bolalar uchun yaratilgan xavfsiz va quvnoq media platforma
					bo‘lib, unda ota-onalar uchun qulayliklar, bolalar uchun esa bilim va
					maroqli vaqt o‘tkazish imkoniyatlari mavjud.
				</p>
			</div>
			<div className="flex flex-col items-center justify-center w-full space-y-[-35px] mt-[80px]">
				<div
					className="max-w-[1200px] w-full h-[282px] flex items-start gap-[30px] px-9 "
					style={{
						background: `url(${rectangle1})`,
						backgroundRepeat: 'no-repeat',
					}}
				>
					<h2 className="text-white text-[48px] font-[900] leading-[60px] max-w-[251px] w-full mt-[64px]">
						Ota-onalar nazorati
					</h2>
					<div className="max-w-[270px] mt-[74px] h-[118px]">
						<p className="text-white text-[24px] font-[800] leading-[36px] ">
							Yoshga mos tavsiyalar
						</p>
						<p className="text-[#FFFFFFCC] text-[16px] font-[600] pt-3">
							Farzandingiz ko‘radigan kontentni siz belgilaysiz. Yoshga mos
							filtrlar yordamida faqat foydali va xavfsiz materiallarni tanlash
							mumkin.
						</p>
					</div>
					<div className="max-w-[270px] mt-[35px]">
						<p className="text-white text-[24px] font-[800] leading-[36px]">
							Xavfsiz kontent muhiti
						</p>
						<p className="text-[#FFFFFFCC] text-[16px] font-[600] pt-3">
							Platformada zararli yoki nomaqbul materiallar yo‘q. Bolalar
							bemalol ko‘rishi mumkin bo‘lgan kontent ehtiyotkorlik bilan tanlab
							qo‘yilgan.
						</p>
					</div>
					<div className="max-w-[270px] mt-[74px] mr-[-20px]">
						<p className="text-white text-[24px] font-[800] leading-[36px]">
							Xavsizlik
						</p>
						<p className="text-[#FFFFFFCC] text-[16px] font-[600] pt-3">
							Farzandingiz ko‘radigan kontentni siz belgilaysiz. Yoshga mos
							filtrlar yordamida faqat foydali va xavfsiz materiallarni tanlash
							mumkin.
						</p>
					</div>
				</div>
				<div
					className="max-w-[1200px] w-full h-[282px] flex items-start gap-[30px] px-9 "
					style={{
						background: `url(${rectangle2})`,
						backgroundRepeat: 'no-repeat',
					}}
				>
					<h2 className="text-white text-[48px] font-[900] leading-[60px] max-w-[251px] w-full mt-[94px]">
						Raqamli kutubxona
					</h2>
					<div className="max-w-[270px] mt-[104px] h-[118px]">
						<p className="text-white text-[24px] font-[800] leading-[36px] ">
							Interaktiv tavsiyalar
						</p>
						<p className="text-[#FFFFFFCC] text-[16px] font-[600] pt-3">
							Interaktiv ertaklar, darsliklar va ta’limiy videolar orqali
							farzandingiz bilimini oshiradi va qiziqishlarini kengaytiradi.
						</p>
					</div>
					<div className="max-w-[270px] mt-[65px] ml-[20px]">
						<p className="text-white text-[24px] font-[800] leading-[36px]">
							Ko‘p turdagi media
						</p>
						<p className="text-[#FFFFFFCC] text-[16px] font-[600] pt-3">
							Allalar, qo‘shiqlar, raqslar, milliy va xorijiy multfilmlar,
							badiiy filmlar – barchasi bir joyda jamlangan.
						</p>
					</div>
					<div className="max-w-[270px] mt-[104px] mr-[-20px]">
						<p className="text-white text-[24px] font-[800] leading-[36px]">
							Milliy qadriyatlar targ‘iboti
						</p>
						<p className="text-[#FFFFFFCC] text-[16px] font-[600] pt-3">
							Alla bolalarga milliy qadriyatlarni singdiruvchi, tarbiyaviy va
							foydali kontentlarni taqdim etadi.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Opportunitites;
