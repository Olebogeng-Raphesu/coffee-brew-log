/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brewd: {
          primary: '#3F3C9C',
          'primary-light': '#5A57B0',
          'primary-dark': '#2D2B70',
          bg: '#F0EEFC',
          surface: '#FFFFFF',
          muted: '#7A78B0',
          'muted-light': '#9E9DC9',
          border: '#E8E6F5',
          'border-light': '#F0EEFC',
          'input-bg': '#F8F7FD',
          danger: '#E53E3E',
          'danger-bg': '#FDE8E8',
        }
      },
      fontFamily: {
        display: ['Fredoka', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '28px',
        'pill': '50px',
      },
      boxShadow: {
        'brewd': '0 2px 12px rgba(63, 60, 156, 0.06)',
        'brewd-lg': '0 8px 32px rgba(63, 60, 156, 0.12)',
        'brewd-btn': '0 4px 16px rgba(63, 60, 156, 0.25)',
      }
    },
  },
  plugins: [],
}