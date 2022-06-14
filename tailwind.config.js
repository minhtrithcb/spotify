const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		extend: {
			animation: {
				'spin-slow': 'spin 3s linear infinite',
				'spin-paused': 'spin paused',
			},
		},
		screens: {
			xs: '475px',
			...defaultTheme.screens,
		},
		fontFamily: {
			quicksand: ['Quicksand', 'sans-serif'],
		},
	},
	plugins: [],
}
