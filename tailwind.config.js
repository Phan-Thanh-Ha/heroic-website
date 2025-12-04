/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx,png,jpg,svg,css}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // Important: Add this to prevent conflicts with Ant Design
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to avoid conflicts with Ant Design
  },
}

