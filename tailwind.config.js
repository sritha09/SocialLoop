/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F4FF',
          100: '#EBE9FE',
          200: '#D7D3FE',
          300: '#B8B0FD',
          400: '#8B7CFF', // Secondary
          500: '#6D5EF8', // Primary
          600: '#5847E0',
          700: '#4736C2',
          800: '#3A2CA1',
          900: '#2A1F78',
        },
        surface: {
          bg: '#FAFAFC',
          card: '#FFFFFF',
          border: '#ECECF3',
          text: '#1F2937',
          darkBg: '#0B0F17',
          darkCard: '#161E2E',
          darkBorder: '#26334D',
          darkText: '#F3F4F6',
        },
        accent: '#14B8A6',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 30px -10px rgba(109, 94, 248, 0.12)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
