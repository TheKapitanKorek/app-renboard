/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      onyx: '#2C3531',
      deepgreen: '#116466',
      darkerskin: '#873e23',
      skin: '#D9B08C',
      cream: '#FFCB9A',
      lightblue: '#D1E8E2',
    },
    screens: {
      sm: '780px',
      md: '1024px',
      lg: '1280px',
      xl: '1536px',
    },
    extend: {},
  },
  plugins: [],
};
