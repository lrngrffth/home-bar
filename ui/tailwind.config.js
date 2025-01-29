/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-marroon': '#564146',
        'dusk-rose': '#C68F9D',
        'baby-pink': '#FFC5D3',
        'cotton-candy': '#FFE3F0'
      },
      fontFamily: {
        'abhaya': 'Abhaya Libre',
        'inter': 'Inter'
      }
    },
  },
  plugins: [],
}

