const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include your source files
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Include Flowbite React components
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // Ensure you have this line to include Flowbite as a plugin
    // ... other plugins if needed
  ],
};
