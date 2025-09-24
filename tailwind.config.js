/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // sesuaikan path file kamu
  ],
  theme: {
    extend: {
      colors: {
        background: "#cccc",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: "var(--font-geist-sans)",
        mono: "var(--font-geist-mono)",
      },
    },
  },
  plugins: [],
};
