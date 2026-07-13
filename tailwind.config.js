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
        dark: {
          bg: '#0B0E11',
          surface: '#1E2329',
          border: '#2B3139',
        },
        accent: '#FF6B35',
        success: '#0ECB81',
        danger: '#F6465D',
        muted: '#848E9C',
      },
    },
  },
  plugins: [],
}

