/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#00f2ff",
        glow: "rgba(0, 242, 255, 0.8)",
        cardBg: "rgba(10, 20, 30, 0.6)",
      },
      letterSpacing: {
        parable: "25px",
        sub: "8px",
      }
    },
  },
  plugins: [],
};