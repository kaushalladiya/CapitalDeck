/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This connects our 'font-mono' class to Cascadia Code
        mono: ['"Cascadia Code"', 'monospace'],
      },
    },
  },
  plugins: [],
}