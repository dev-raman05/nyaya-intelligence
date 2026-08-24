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
        nyaya: {
          bg: '#08111F',
          surface: '#101D2D',
          border: '#263548',
          accent: '#F59E0B',
          verified: '#10B981',
          info: '#38BDF8',
          warning: '#F59E0B',
          critical: '#EF4444',
          text: '#F8FAFC',
          secondary: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-source-serif)']
      }
    },
  },
  plugins: [],
}
