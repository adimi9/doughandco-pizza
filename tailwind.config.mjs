/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F4A300',
        background: '#F3E9DC',
        accent: '#006D3D',
        text: '#4B2C20',
        highlight: '#F4A261',
      },
    },
  },
  plugins: [],
};
