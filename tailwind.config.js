/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        cream: '#FBF6EE',
        'cream-dark': '#E9E0D2',
        ink: '#33302C',
        muted: '#A89E8E',
        faint: '#B0A593',
        border: '#F2ECE2',
        violet: {
          light: '#B4A8F5',
          mid: '#8C7AE6',
          DEFAULT: '#6C5CE7',
          bg: '#EFEBFB',
        },
        coral: {
          DEFAULT: '#F4795B',
          dark: '#C5482C',
          bg: '#FCEAE3',
          border: '#F6C3B2',
        },
        gold: {
          DEFAULT: '#F0B429',
          dark: '#C99A2E',
          bg: '#FBF3DE',
        },
        blue: '#5B8DEF',
      },
      fontFamily: {
        sans: ['Nunito_600SemiBold', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    // RN needs the exact font file per weight; re-declare the weight utilities
    // so every existing font-semibold/bold/extrabold picks up Nunito for free.
    require('tailwindcss/plugin')(({ addUtilities }) => {
      addUtilities({
        '.font-semibold': { fontFamily: 'Nunito_600SemiBold' },
        '.font-bold': { fontFamily: 'Nunito_700Bold' },
        '.font-extrabold': { fontFamily: 'Nunito_800ExtraBold' },
      });
    }),
  ],
};
