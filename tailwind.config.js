/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      
      colors: {
        "btn": "hsl(180, 66%, 49%);",
        "bg": "hsl(257, 27%, 26%);",
        "bga": "hsl(257, 27%, 26%);"
      }
    },
  },
  plugins: [],
}

