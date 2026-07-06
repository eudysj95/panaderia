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
          teal: "#4aa099",
          green: "#179A4E",
          red: "#E44B3B",
          blue: "#1B9FAB",
          yellow: "#FEB90B",
        },
      },
    },
  },
  plugins: [],
}

