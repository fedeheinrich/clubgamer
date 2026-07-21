/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'principal-violeta': '#511BFD',
        'secundario-azul-oscuro': '#03021F',
        'terciario-turquesa': '#01C3E8',
        'gris-cartel': '#0f171f',
        'blanco': '#FFFFFF',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'sora': ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
}