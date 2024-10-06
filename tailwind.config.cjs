module.exports = {
    content: [
      './public/**/*.html',
      './src/**/*.{js,jsx,ts,tsx,vue}',
      "./formkit.theme.ts"
    ],
    darkMode: 'class',
    theme: {
      extend: {},
    },
    plugins: [
      require('@formkit/themes/tailwindcss'),
      require('@tailwindcss/forms')
    ],
  }
  