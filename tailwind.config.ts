import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8ed',
          100: '#ffefd2',
          500: '#f59f00',
          600: '#d97904',
          900: '#5f3207'
        }
      }
    }
  },
  plugins: []
};

export default config;
