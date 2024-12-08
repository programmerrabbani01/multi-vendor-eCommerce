/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primaryMedium: ["Medium"],
        primaryMediumItalic: ["MediumItalic"],

        primarySemiBold: ["SemiBold"],
        primarySemiBoldItalic: ["SemiBoldItalic"],

        primaryThin: ["Thin"],
        primaryThinItalic: ["ThinItalic"],

        primaryRegular: ["Regular"],
        primaryItalic: ["Italic"],
      },
    },
  },
  plugins: [],
};
