const plugin = require('tailwindcss/plugin');

module.exports = {
	content: [
		'./src/**/*.{html,svelte,ts}',
	],
	theme: {
		extend: {
			fontFamily: {
				body: `'Outfit', sans-serif`,
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('hocus', ['&:hover', '&:focus', '&:active']);
		}),
	],
};
