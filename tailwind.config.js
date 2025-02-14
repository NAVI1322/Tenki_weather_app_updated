const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'bounce-slight': 'bounce-slight 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'scale': 'scale 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-slight': {
          '0%, 100%': { transform: 'translateY(-2%)' },
          '50%': { transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        scale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      },
      fontFamily: {
        'sans': ['"Quicksand"', ...defaultTheme.fontFamily.sans],
        'display': ['"Fredoka One"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        cartoon: {
          blue: '#60A5FA',
          purple: '#A78BFA',
          pink: '#F472B6',
          yellow: '#FBBF24',
          green: '#34D399',
          orange: '#FB923C',
          red: '#F87171',
          teal: '#2DD4BF',
          indigo: '#818CF8',
        }
      },
      boxShadow: {
        'cartoon': '0 4px 0 0 rgba(0, 0, 0, 0.1)',
        'cartoon-lg': '0 8px 0 0 rgba(0, 0, 0, 0.1)',
        'cartoon-xl': '0 12px 0 0 rgba(0, 0, 0, 0.1)',
        'inner-cartoon': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
