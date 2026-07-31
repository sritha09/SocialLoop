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
        pastel: {
          lavender: '#f3e8ff',
          pink: '#fce7f3',
          lilac: '#e9d5ff',
          sky: '#e0f2fe',
          mint: '#dcfce7',
          peach: '#ffedd5',
          cream: '#fffbeb',
          purple: '#c084fc',
        },
        dreamy: {
          bg: '#080a12',
          card: '#0f1424',
          border: 'rgba(192, 132, 252, 0.15)',
          glow: 'rgba(168, 85, 247, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'pastel': '0 10px 30px -10px rgba(192, 132, 252, 0.25)',
        'glow-dreamy': '0 0 35px rgba(168, 85, 247, 0.2)',
        'glow-cyan': '0 0 35px rgba(56, 189, 248, 0.2)',
      }
    },
  },
  plugins: [],
}
