/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '120': '30rem',
        '128': '32rem',
        '168': '42rem',
        '288': '72rem',
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [
    require("daisyui"),
    "prettier-plugin-tailwindcss"
  ],
  daisyui: {
    themes: [
      "light",
    ],
  },
}
