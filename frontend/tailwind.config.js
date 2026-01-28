/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#137fec",
        "background-dark": "#0a0b1e",
        "accent-purple": "#a855f7",
        "glass-border": "rgba(255,255,255,0.1)",
        "glass-bg": "rgba(16, 25, 34, 0.6)"
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"]
      },
      borderRadius: {
        "lg": "0.5rem",
        "xl": "0.75rem"
      },
    },
  },
  plugins: [],
}
