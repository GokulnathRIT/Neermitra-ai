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
          blue: '#1E3A8A',
          lightblue: '#3B82F6',
          green: '#10B981',
          lightgreen: '#34D399',
          white: '#FFFFFF',
          glass: 'rgba(255, 255, 255, 0.1)',
        }
      },
      backdropBlur: {
        md: '10px',
      }
    },
  },
  plugins: [],
}
