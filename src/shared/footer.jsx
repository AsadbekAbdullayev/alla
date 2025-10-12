import React from 'react';
import FooterLogo from '@/assets/icons/footerLogo.svg';

const Footer = () => {
	return (
		<div className="px-[120px] pt-[120px] border-t border-[#FFFFFF1A] w-full">
			<div className="w-full flex justify-between pb-[80px]">
				<div className="max-w-[567px] w-full">
					<img src={FooterLogo} alt="" width={120} height={157} />
					<p className="text-[18px] text-white leading-[24px] pt-8">
						Alla — bolajonlar uchun xavfsiz va foydali media platforma. Milliy
						allalar, multfilmlar, ta’limiy kontent va sog‘lom turmush tarzi
						loyihalari bilan farzandingizning quvonchi va bilimi uchun xizmat
						qilamiz.
					</p>
				</div>
				<div>
					<div>
            <p>Asosiy</p>
						<ul>
							<li>Bo’limlar</li>
							<li>Platforma imkoniyatlari</li>
							<li>Bolalar xavfsizligi</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
