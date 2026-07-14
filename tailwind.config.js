/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E97A2B',
          light: '#F4A261',
        },
        secondary: '#F2CC8F',
        accent: '#E76F51',
        'warm-bg': '#FFF8F0',
        surface: '#FFFFFF',
        'surface-alt': '#FEF3E2',
        'warm-border': '#E8DDD0',
        'text-primary': '#3D2C1E',
        'text-secondary': '#8B7355',
        'text-disabled': '#C4B6A6',
        success: '#4CAF50',
        error: '#E74C3C',
        warning: '#FF9800',
        info: '#5DADE2',
        muted: '#8B7355',
        brand: {
          teal: '#4aa099',
          green: '#179A4E',
          red: '#E44B3B',
          blue: '#1B9FAB',
          yellow: '#FEB90B',
        },
      },
    },
  },
  plugins: [],
}
