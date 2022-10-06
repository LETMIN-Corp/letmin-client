module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        'primary': '#9C37EB',
        'dark-purple': '#47196B',
        'light-purple': '#BE7EEE',
        'bold-purple': '#55396B',
        'bright-purple': '#7A2AB8',
        'lively-purple': '#8800EA',
        'lilac': '#F4E6FF',
        'white': '#FFFEFF',
        'gray': '#E6DCC7',
        'bright-gray':  '#9ca3af',
        'black': '#000002',
        'green': {
          light: '#90ee90',
          DEFAULT: '#00C853',
          dark: '#009624',
        },
        'red': '#E83736',
        'dark-red': '#B91C1C',
      },
      minHeight: {
        '0': '0',
        '80': '80vh',
        '90': '90vh',
        'screen': '100vh',
      },
      minWidth: {
        'sm': '115px',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        }
      },
    },
  },
  plugins: [],
} 