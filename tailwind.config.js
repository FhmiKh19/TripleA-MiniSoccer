/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#C89B00",
          goldLight: "#F0C040",
          dark: "#1A1200",
        },
      },
    },
  },
  plugins: [],
};
