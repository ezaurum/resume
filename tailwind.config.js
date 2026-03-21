/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC04',
          green: '#34A853',
          gray: '#5F6368',
          'light-gray': '#E8EAED',
        }
      }
    },
  },
  plugins: [],
}
