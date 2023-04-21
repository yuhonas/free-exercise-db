/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,vue,ts,jsx,tsx}'],
  safelist: [
    'bg-gray-700',
    'hover:bg-gray-800',
    'dark:bg-gray-800',
    'dark:hover:bg-gray-700',
    'dark:focus:ring-gray-800',
    'focus:ring-gray-300',
    'bg-blue-700',
    'hover:bg-blue-800',
    'dark:bg-blue-800',
    'dark:hover:bg-blue-700',
    'dark:focus:ring-blue-800',
    'focus:ring-blue-300',
    {
      pattern: /bg-(gray|blue)-(100|200|300)/
    }
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
