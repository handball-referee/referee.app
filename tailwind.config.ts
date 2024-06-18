import {Config} from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    colors: {
      green: {
        100: "#aad357",
        200: "#48b95e",
        300: "#088a46",
      },
      red: {
        100: "#f15257",
        200: "#ec1941",
        300: "#c01e2e",
      },
      orange: {
        100: "#fdb132",
        200: "#f6a125",
        300: "#f78234",
      },
      blue: {
        100: "#00aef3",
        200: "#0181c9",
        300: "#2a579c",
        400: "#063e67",
        500: "#00263c",
      },
      grey: {
        100: "#f2f1f3",
        200: "#e1e1e1",
        300: "#cccccc",
        400: "#888888",
      },
      white: '#ffffff',
      black: "#000000"
    },
    fontFamily: {
      sans: ['Roboto', "Helvetica", "Arial", "sans-serif"]
    },
    extend: {
      keyframes: {
        loading: {
          '0%, 40%, 100%': {
            opacity: '100%'
          },
          '20%': {
            opacity: '0'
          }
        }
      },
      animation: {
        loading: 'loading 0.8s infinite ease-in-out'
      }
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
}

export default config;
