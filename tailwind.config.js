// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // === ADD THIS LINE FOR DARK MODE SUPPORT ===
  darkMode: 'class', 
  // ===========================================
  content: [
    // This array tells Tailwind where your classes are used
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Add any custom colors or fonts here later if needed
    },
  },
  plugins: [],
};