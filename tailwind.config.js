/** @type {import('tailwindcss').Config} */

const baseFontSize = 10;

// eslint-disable-next-line no-undef
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      gridTemplateColumns: {
        "3/1": "3fr 1fr",
        "1.5/1": "1.6fr 1fr",
        "2/1x5": "2fr 1fr 1fr 1fr 1fr 1fr",
        "2/1x2": "2fr 1fr 1.5fr",
        "1/4": "1fr 4fr",
        "4/1x5": "3fr 1fr 1fr 1fr 1fr 1fr",
      },
      spacing: () => ({
        ...Array.from({ length: 96 }, (_, index) => index * 0.5)
          .filter((i) => i)
          .reduce(
            (acc, i) => ({ ...acc, [i]: `${i / (baseFontSize / 4)}rem` }),
            {}
          ),
      }),
      fontSize: {
        xs: [
          `${(16 * 0.75) / baseFontSize}rem` /* 12px */,
          {
            lineHeight: `${(16 * 1) / baseFontSize}rem` /* 16px */,
          },
        ],
        sm: [
          `${(16 * 0.875) / baseFontSize}rem` /* 14px */,
          {
            lineHeight: `${(16 * 1.25) / baseFontSize}rem` /* 20px */,
          },
        ],
        base: [
          `${(16 * 1) / baseFontSize}rem` /* 16px */,
          {
            lineHeight: `${(16 * 1.5) / baseFontSize}rem` /* 24px */,
          },
        ],
        lg: [
          `${(16 * 1.125) / baseFontSize}rem` /* 18px */,
          {
            lineHeight: `${(16 * 1.75) / baseFontSize}rem` /* 28px */,
          },
        ],
        xl: [
          `${(16 * 1.25) / baseFontSize}rem` /* 20px */,
          {
            lineHeight: `${(16 * 1.75) / baseFontSize}rem` /* 28px */,
          },
        ],
        "2xl": [
          `${(16 * 1.5) / baseFontSize}rem` /* 24px */,
          {
            ineHeight: `${(16 * 2) / baseFontSize}rem` /* 32px */,
          },
        ],
        "3xl": [
          `${(16 * 1.875) / baseFontSize}rem` /* 30px */,
          {
            lineHeight: `${(16 * 2.25) / baseFontSize}rem` /* 36px */,
          },
        ],
        "4xl": [
          `${(16 * 2.25) / baseFontSize}rem` /* 36px */,
          {
            lineHeight: `${(16 * 2.5) / baseFontSize}rem` /* 40px */,
          },
        ],
        "5xl": [
          `${(16 * 3) / baseFontSize}rem` /* 48px */,
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
        "6xl": [
          `${(16 * 3.75) / baseFontSize}rem` /* 60px */,
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
        "7xl": [
          `${(16 * 4.5) / baseFontSize}rem` /* 72px */,
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
        "8xl": [
          `${(16 * 6) / baseFontSize}rem` /* 96px */,
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
        "9xl": [
          `${(16 * 8) / baseFontSize}rem` /* 128px */,
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
      },
      fontFamily: {
        Sarabun: ["Sarabun", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#fed700",
        textColor: "#5b5b5b",
        yellow: "rgb(255, 195, 0)",
        black: "#191919",
        red: "#cf5050",
        gray: "#cccc",
      },
      boxShadow: {
        vertival: "0px 2px 4px rgba(0, 0, 0, 0.13)",
      },
    },
  },
  plugins: [],
};
