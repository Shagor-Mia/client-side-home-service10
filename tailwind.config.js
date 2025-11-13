/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#632ee3",
          secondary: "#9f62f2",
          "base-100": "#ffffff",
          "base-content": "#1f2937",
        },
      },
      {
        dark: {
          primary: "#9f62f2",
          secondary: "#632ee3",
          "base-100": "#1e1e2f",
          "base-content": "#e5e7eb",
        },
      },
    ],
  },
};
