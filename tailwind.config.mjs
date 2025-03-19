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
        primary: '#006D3D',
        background: '#F3E9DC',
        accent: '#F4EAD2',
        text: '#4B2C20',
        highlight: '#F4A261',
      },
    },
  },
  plugins: [],
};
