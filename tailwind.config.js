export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00FF41',
          light: '#7AFF41',
          dark: '#00CC33',
        },
        secondary: {
          DEFAULT: '#FF3366',
          light: '#FF6699',
          dark: '#CC0033',
        },
        background: {
          DEFAULT: '#121212',
          light: '#1E1E1E',
          dark: '#0A0A0A',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        game: ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
}