/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			rotate: ['hover'],
		},
		fontFamily: {
			sans: ['sans', 'Mulish'],
			serif: ['serif', 'Vollkorn'],
		},
	},
	plugins: [require('tailwind-scrollbar')],
	corePlugins: {
		preflight: false,
	},
};
