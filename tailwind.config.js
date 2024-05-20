/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: 'Montserrat'
      },
      backgroundImage: {
        'rainbow-image': "url('./../../../public/img/Rainbow Shade.png')",
        'flower-image': "url('./../../../public/img/FLower Img.png')",
      }
    },
  },
  plugins: [],
}

