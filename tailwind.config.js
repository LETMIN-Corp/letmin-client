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
        'dark-gray': '#777575',
        'black': '#000002',
        'green': {
          light: '#cafdca',
          DEFAULT: '#00C853',
          dark: '#009624',
        },
        'red': {
          light: '#EFA1A1',
          DEFAULT: '#E83736',
          dark: '#B91C1C',
        }
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
          "0%": { transform: "translate(1px, 1px);" },
          "10%": { transform: "translate(-1px, -2px);" },
          "20%": { transform: "translate(-1px, 0px);" },
          "30%": { transform: "translate(1px, 1px);" },
          "40%": { transform: "translate(1px, -1px);" },
          "50%": { transform: "translate(-1px, 1px);" },
          "60%": { transform: "translate(-1px, 1px);" },
          "70%": { transform: "translate(1px, 1px);" },
          "80%": { transform: "translate(-1px, -1px);" },
          "90%": { transform: "translate(1px, 1px);" },
          "100%": { transform: "translate(1px, -1px);" },
        },
        disappear: {
          "0%": { display: "block;" },
          "100%": { display: "hidden;" },
        }
      },
    },
  },
  plugins: [],
} 