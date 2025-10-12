import React from 'react';
import slide1 from '@/assets/images/slide1.png';
import slide2 from '@/assets/images/slide2.png';
import slide3 from '@/assets/images/slide3.png';
import slide4 from '@/assets/images/slide4.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const CartoonSlides = () => {
	const images = [
		slide1,
		slide2,
		slide3,
		slide4,
		slide1,
		slide2,
		slide3,
		slide4,
		slide1,
		slide2,
		slide3,
		slide4,
		slide1,
		slide2,
		slide3,
		slide4,
	];
	return (
		<div className=" w-full min-h-[608px] h-full relative z-10 flex items-center justify-center overflow-hidden bg-white">
			<div className="w-[2100px] h-[412px] p-[30px] bg-white absolute top-[-310px] rounded-[60%] z-30"></div>
			<div className="w-[2100px] bg-gradient-to-t from-[#001145] to-[#001145]/50 rounded-[50%] h-[412px]  absolute top-[-340px] z-40"></div>

			<Swiper
				effect={'coverflow'}
				grabCursor={true}
				centeredSlides={true}
				slidesPerView={'auto'}
				coverflowEffect={{
					rotate: 50,
					stretch: 0,
					depth: 0,
					modifier: 0,
					slideShadows: false,
				}}
				autoplay={{ delay: 2000, disableOnInteraction: false }}
				modules={[EffectCoverflow, Autoplay]}
				loop={true}
				className="w-full bg-white"
			>
				{images.map((src, i) => (
					<SwiperSlide key={i} className="!w-[348px] !h-[498px] mx-[15px]">
						<img
							src={src}
							alt=""
							className=" object-cover w-full h-full shadow-lg"
						/>
					</SwiperSlide>
				))}
			</Swiper>
            <div className="w-[2100px] h-[412px] p-[30px] bg-white absolute bottom-[-310px] rounded-[50%] z-30"></div>
			<div className="w-[2100px] bg-[#001145] rounded-[50%] h-[412px]  absolute bottom-[-340px] z-40"></div>
		</div>
	);
};

export default CartoonSlides;
