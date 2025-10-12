import React from 'react';
import content1 from '@/assets/images/content1.png';
import content2 from '@/assets/images/content2.png';
import content3 from '@/assets/images/content3.png';
import content4 from '@/assets/images/content4.png';
import content5 from '@/assets/images/content5.png';
import content6 from '@/assets/images/content1.png';
import content7 from '@/assets/images/content1.png';

const Content = () => {
	const contents = [
		{
			id: 1,
			title: 'Turli hududlarga xos allalar',
			desc: 'O‘zbekistonning turli hududlariga oid allalar, xalq og‘zaki ijodi va qo‘shiqlar farzandingiz uchun bir joyda .',
			image: content1,
		},
		{
			id: 2,
			title: 'Milliy multfilmlar va animatsion kliplar',
			desc: 'Mahalliy studiyalar tomonidan yaratilgan qiziqarli multfilmlar va bolajonlarga mos animatsion kliplar.',
			image: content2,
		},
		{
			id: 3,
			title: 'Bolalar uchun badiiy filmlar va seriallar',
			desc: 'Yosh tomoshabinlar uchun maxsus tanlab olingan quvnoq va tarbiyaviy badiiy filmlar hamda seriallar.',
			image: content3,
		},
		{
			id: 4,
			title: 'Ta’limiy kontentlar va raqamli kutubxona',
			desc: 'Bolalarning bilimini oshiradigan interaktiv darsliklar, ertaklar va raqamli kutubxona materiallari.',
			image: content4,
		},
		{
			id: 5,
			title: 'Tarjima qilingan xorijiy multfilmlar',
			desc: 'Dunyoga mashhur multfilmlar o‘zbek tilidagi tarjimalarda, bolalar uchun yanada tushunarli va qiziqarli.',
			image: content5,
		},
		{
			id: 6,
			title: 'Qo‘shiq va raqslar',
			desc: 'Bolalar uchun quvnoq qo‘shiqlar va raqslar, oilaviy bayram va dam olish vaqtlarini yanada maroqli qiladi.',
			image: content6,
		},
		{
			id: 7,
			title: 'Sog‘lom turmush tarzini targ‘ib etuvchi loyihalar',
			desc: 'Sport, gigiyena va sog‘lom odatlar haqida qiziqarli ko‘rsatuv va loyihalar.',
			image: content7,
		},
		{
			id: 8,
			title: 'Sog‘lom turmush tarzini targ‘ib etuvchi loyihalar',
			desc: 'Sport, gigiyena va sog‘lom odatlar haqida qiziqarli ko‘rsatuv va loyihalar.',
			image: content7,
		},
	];

	return (
		<div
			className="relative z-10 pt-[80px] px-[120px] pb-[278px] w-full flex flex-col items-center min-h-[1000px] "
		>
			<div className="max-w-[700px] w-full">
				<h2 className="text-white text-[48px] font-[800]  text-center">
					📚 Bolajonlar uchun bilim va maroqli kontent
				</h2>
				<p className="text-[#FFFFFFCC] text-[20px] font-[500] leading-[28px] text-center pt-[20px]">
					Alla platformasi 7 ta maxsus bo‘limdan iborat bo‘lib, unda milliy
					allalar, multfilmlar, badiiy filmlar, ta’limiy materiallar, xorijiy
					tarjima multfilmlar, qo‘shiqlar va sog‘lom turmush tarziga oid
					loyihalar jamlangan.
				</p>
			</div>
			<div className="w-full flex items-center justify-center flex-wrap gap-[20px] pt-[80px]">
				{contents?.map((item) => (
					<div
						key={item?.id}
						className="max-w-[285px] w-full h-[434px]  rounded-[16px] flex flex-col items-center p-5 bg-[#436EFF45] "
					>
                            <span className="text-white text-[48px] font-[400] leading-[68%] pb-[24px]">
                                #0{item?.id}
                            </span>
                            <img src={item?.image} alt="" />
                            <p className='text-[#FFDBDB] text-[22px] font-[800] leading-[28px] pt-6 text-center'>{item?.title}</p>
                            <p className='text-[#FFDBDBE5] text-[14px] font-[600] leading-[20px] pt-4 text-center line-clamp-3'>{item?.desc}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Content;
