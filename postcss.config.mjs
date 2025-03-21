/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {}, // Use the new package
    autoprefixer: {}, // Optional: Add autoprefixer if needed
  },
}

export default config
