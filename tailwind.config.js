/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#F8F9FA', /* Light Background (White/Alabaster) */
          light: '#FFFFFF',
        },
        ember: {
          DEFAULT: '#D4AF37', /* Champagne Gold */
          dim: '#A68421',
        },
        fire: {
          DEFAULT: '#0A192F', /* Navy Blue */
        },
        ash: {
          DEFAULT: '#0A192F', /* Navy Blue for Text */
        }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
