/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        clr1: "#556B2F",
        clr2: "#6B8E23",
        clr3: "#8FBC8F",
        clr4: "#BDB76B",
        clr5: "#CD853F",
        primary: "#0f172a",

      },
      container:
      {
        center: true,
        padding:
        {
          DEFAULT: "1rem",
          sm: "3rem",

        },
      },
    },
  },
  plugins: [],
}