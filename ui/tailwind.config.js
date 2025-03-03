/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-marroon': '#402d32',
        'dusk-rose': '#C68F9D',
        'baby-pink': '#FFC5D3',
        'cotton-candy': '#FFE3F0'
      },
      fontFamily: {
        'abhaya': 'Abhaya Libre',
        'inter': 'Inter'
      },
      backgroundImage: {
        'paw-print': "url('./images/paws.png')",
      },
    },
  },
  plugins: [],
}

