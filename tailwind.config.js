/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        secondary: '#7c3aed',
        dark: '#0a0a0a',
        light: '#f8fafc',
      },
      fontFamily: {
        'sans': ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
        'serif': ['Playfair Display', 'ui-serif', 'Georgia'],
        'display': ['Oswald', 'ui-sans-serif', 'system-ui'],
        'artistic': ['Playfair Display', 'serif'],
        'bricolage': ['Bricolage Grotesque', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
