import React from 'react';
import Navbar from '@/shared/navbar';
import Header from './ui/Header';
import Content from './ui/Content';
import CartoonSlides from './ui/CartoonSlides';
import Opportunitites from './ui/Opportunitites';
import ChildSecurity from './ui/ChildSecurity';
import Footer from '@/shared/footer';

const Main = () => {
	return (
		<div className=" w-full h-full bg-[#001145]">
			<Header />
			<CartoonSlides/>
			<Content />
			<Opportunitites/>
			<ChildSecurity/>
			<Footer/>
		</div>
	);
};

export default Main;
