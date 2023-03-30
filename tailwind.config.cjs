/** @type {import('tailwindcss').Config} */
module.exports = {
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], 
  theme: {
    extend: {
      colors:{
          "genesis-gray": {
            200: "#F2F4F5",
            300: "#E7EAED",
            400: "#6D6E6E",
            500:"#6D6E6F",
            600:"#D9D9D9",
            700:"#F4F4F4",
            800:"#65686D",
          },
          "genesis-green": {
            300: "#51AAA5",
          },
          'genesis-purple':{
            300:'#919AB1'
          }
        },
        borderRadius:{
          '1.5xl':'14px'
        } 
      },
    },
    plugins: [],
    };