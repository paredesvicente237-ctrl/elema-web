import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        elema: {
          black: '#090909',
          soft: '#111111',
          graphite: '#1B1B1B',
          steelDark: '#41454A',
          steel: '#777D83',
          silver: '#BFC3C7',
          marble: '#D8D4CC',
          warm: '#F4F1EA',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config;
