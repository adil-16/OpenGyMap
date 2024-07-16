/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(360deg, #2A346C 14.84%, #3971A1 103.16%)",
      },
      colors: {
        "custom-black": "#252525",
        "custom-gray": "#25252580",
        "custom-blue": "#2A346C",
        "nav-gray": "#595959",
        "navbar-gray": "#F8F8F8",
        "request-icon":"#BC0000",
        
        "request-button-accepted":"#28C76F",
        "request-button-notresponse":"#F79E1B",
        "request-button-decline":"#F1416C",
        "Privacypolicy-text":"#717171"

      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],

      },
      boxShadow: {
        'custom-light': '0px -2px 10px 4px rgba(133, 133, 133, 0.12)', // Adjust color and opacity if needed
      },
    },
  },
  plugins: [],
};
