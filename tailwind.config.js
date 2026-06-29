/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#e0f2fe', // sky-100
          DEFAULT: '#0ea5e9', // sky-500
          dark: '#0369a1', // sky-700
        },
        leaf: {
          light: '#dcfce7', // green-100
          DEFAULT: '#22c55e', // green-500
          dark: '#15803d', // green-700
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
