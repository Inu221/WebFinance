/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // или 'media' — но 'class' даёт больше контроля
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
}
