/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // или 'media' — но 'class' даёт больше контроля
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // синий (blue-500)
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
}
