/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f6ff',
          100: '#e5e1ff',
          // Add more shades as you like
        },
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '1rem',
            maxWidth: '65ch',
            p: {
              marginTop: '0.25em',
              marginBottom: '0.25em',
              lineHeight: '0.5',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
