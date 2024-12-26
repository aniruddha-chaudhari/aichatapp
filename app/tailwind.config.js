/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        secondary: '#5856D6',
        accent: '#FF2D55',
        background: '#F2F2F7',
        surface: '#FFFFFF',
        error: '#FF3B30',
        text: {
          primary: '#000000',
          secondary: '#3C3C43',
          tertiary: '#787880'
        }
      },
      fontFamily: {
        sans: ['System'],
        mono: ['Courier']
      }
    },
  },
  plugins: [],
}
