/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nuckle: ["nuckle"]
      },
      colors: {
        'laranja': '#FF5E2B'
      }
    },
  },
  plugins: [],
}
