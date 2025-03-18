/** @type {import('tailwindcss').Config} */
export default {
  content: ["./layout/**/*.vue"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "100%",
          md: "90%",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        tablet: "992px",
        lg: "1026px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        primary: {
          main: "#244453",
          secondary: "#162F3B",
        },
        secondary: "#ED4136",
        "app-white": {
          main: "#FFFFFF",
          secondary: "#2444530D",
        },
        "app-black": {
          main: "#000000",
          secondary: "#1F1F1F",
          third: "#797979",
        },
        "app-gray": {
          main: "#C7C7CC",
        },
      },
      borderRadius: {
        "app-radius": "20px",
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
