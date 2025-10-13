import React from 'react';
import FooterLogo from '@/assets/icons/footerLogo.svg';
import ellipse from '@/assets/icons/footerEllipse.svg';
import instagram from '@/assets/icons/footerInstagram.svg';
import telegram from '@/assets/icons/footerTelegram.svg';
import twitter from '@/assets/icons/footerTwitter.svg';
import facebook from '@/assets/icons/footerFacebook.svg';

const Footer = () => {
	return (
		<div className="px-[120px] pt-[120px] border-t border-[#FFFFFF1A] w-full relative">
			<div className="w-full flex justify-between pb-[80px] relative z-50 border-b border-[#FFFFFF33]" >
				<div className="max-w-[567px] w-full">
					<img src={FooterLogo} alt="" width={120} height={157} />
					<p className="text-[18px] font-[600] text-white leading-[24px] pt-8" style={{fontFamily: "Fredoka"}}>
						Alla — bolajonlar uchun xavfsiz va foydali media platforma. Milliy
						allalar, multfilmlar, ta’limiy kontent va sog‘lom turmush tarzi
						loyihalari bilan farzandingizning quvonchi va bilimi uchun xizmat
						qilamiz.
					</p>
				</div>
				<div className="flex justify-end gap-[24px] w-full">
					<div className="max-w-[193px] w-full">
						<p className="text-[#FFFFFF99] text-[14px] pb-[13px] font-[600]" style={{fontFamily: "Fredoka"}}>
							Asosiy
						</p>
						<ul className="space-y-[13px]">
							<li className="text-white text-[16px] cursor-pointer font-[600]" style={{fontFamily: "Fredoka"}}>
								Bo’limlar
							</li>
							<li className="text-white text-[16px] cursor-pointer font-[600]" style={{fontFamily: "Fredoka"}}>
								Platforma imkoniyatlari
							</li>
							<li className="text-white text-[16px] cursor-pointer font-[600]" style={{fontFamily: "Fredoka"}}>
								Bolalar xavfsizligi
							</li>
						</ul>
					</div>
					<div className="max-w-[180px] w-full">
						<p className="text-[#FFFFFF99] text-[14px] font-[600] pb-[13px]" style={{fontFamily: "Fredoka"}}>
							Faoliyat
						</p>
						<ul className="space-y-[13px]">
							<li className="text-white text-[16px] cursor-pointer font-[600]" style={{fontFamily: "Fredoka"}}>
								Biz haqimizda
							</li>
							<li className="text-white text-[16px] cursor-pointer font-[600]" style={{fontFamily: "Fredoka"}}>
								Rahbariyat
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="py-[34px] flex justify-between">
				<p className='text-[#FFFFFF99] text-[14px] font-[500]' style={{fontFamily: "Inter"}}>© 2025 Alla platformasi</p>
				<div className="flex items-center gap-4">
					<a href="">
						<img src={instagram} alt="Instagram" />
					</a>
					<a href="">
						<img src={telegram} alt="Telegram" />
					</a>
					<a href="">
						<img src={twitter} alt="Twitter" />
					</a>
					<a href="">
						<img src={facebook} alt="Facebook" />
					</a>
				</div>
			</div>
			{/* <img src={ellipse} alt=""  className='absolute top-0 left-0'/> */}
		</div>
	);
};

export default Footer;
