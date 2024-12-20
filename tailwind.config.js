/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1DA1F2',
          hover: '#0d8ae6',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-gray': '#252525',
        'custom-white': '#F0F0F0'
      },
    },
  },
  plugins: [],
};
