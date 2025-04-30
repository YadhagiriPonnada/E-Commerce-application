/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'Roboto', 'Open Sans', 'sans-serif'],
      },
      colors: {
        primary: '#FF3E6C',
        secondary: '#535766',
        light: '#F5F5F6',
        dark: '#282C3F',
      }
    },
  },
  plugins: [],
} 