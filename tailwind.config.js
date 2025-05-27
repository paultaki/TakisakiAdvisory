module.exports = {
  content: [
    './**/*.html',
    './js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'outlier-cyan': '#00FFFF',
        'dark-gray': '#121212',
        'medium-gray': '#232323',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
      }
    }
  },
  plugins: [],
}