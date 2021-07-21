module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  darkMode: 'media',
  theme: {
  },
  variants: {},
  plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')],
};
