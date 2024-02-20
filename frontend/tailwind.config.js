/** @type {import('tailwindcss').Config} */
/** @type {import('daisyui').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Pacifico: ["Pacifico"],
        Montserrat: ["Montserrat"],
      },
    },
  },
};
