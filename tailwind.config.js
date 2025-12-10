/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': 'var(--cyber-black)',
        'cyber-dark': 'var(--cyber-dark)',
        'cyber-primary': 'var(--cyber-primary)',
        'cyber-secondary': 'var(--cyber-secondary)',
        'cyber-text': 'var(--cyber-text)',
      },
      fontFamily: {
        display: ["Rajdhani", "sans-serif"]
      }
    },
  },
  plugins: [],
}
