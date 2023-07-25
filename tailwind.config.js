/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      "light-gray": "#E3E6EC",
      black: "#474955",
      white: "#FCFCFC",
      "bg-input": "#5A5C66",
      green: "#7EBC3C",
      "gray-dark": "#B2B7BF",
    },
    extend: {
      screens: {
        xs: "316px",
        sm: "375px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
    },
  },
};
