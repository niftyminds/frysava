/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Zemité tóny - nová paleta
        sand: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#e8dfd0',
          300: '#d4c4aa',
          400: '#c0ad8e',
        },
        wood: {
          50: '#f5f3f0',
          100: '#e8e4df',
          200: '#d1c7bd',
          300: '#b5a594',
          400: '#9d8a75',
          500: '#8b7355',
          600: '#5c4a3d',
          700: '#4a3a2f',
          800: '#3d2f24',
          900: '#2d221a',
        },
        moss: {
          50: '#f3f6f4',
          100: '#e3ebe5',
          200: '#c7d7cb',
          300: '#a1bda7',
          400: '#6b8f71',
          500: '#4a6b50',
          600: '#3d5a42',
          700: '#2f4633',
        },
        charcoal: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#4a4a4a',
          700: '#3a3a3a',
          800: '#2a2a2a',
          900: '#1a1a1a',
        },
        // Zachovat primary jako alias pro zpětnou kompatibilitu (postupně nahradit)
        primary: {
          50: '#faf8f5',
          100: '#f5f0e8',
          500: '#4a6b50',
          600: '#3d5a42',
          700: '#2f4633',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
