/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "animate-spin-20s": "logo-spin infinite 20s linear"
      }
    },
  },
  plugins: [],
}

