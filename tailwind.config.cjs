/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f6ff',
          100: '#e5e1ff',
          // Add more shades as needed
        }
      }
    },
  },
  plugins: [],
}