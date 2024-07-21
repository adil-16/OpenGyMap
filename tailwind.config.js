/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(360deg, #2A346C 14.84%, #3971A1 103.16%)",
        "custom-red-gradient":
          "linear-gradient(180deg, #FF5630 0%, #99341D 100%)",
      },
      colors: {
        "custom-black": "#252525",
        "custom-gray": "#25252580",
        "custom-blue": "#2A346C",
        "nav-gray": "#595959",
        "navbar-gray": "#F8F8F8",
        "request-icon": "#BC0000",
        "border-color":"#979797",
        "placeholder-color":"#59595980",

        "request-button-accepted": "#28C76F",
        "request-button-notresponse": "#F79E1B",
        "request-button-decline": "#F1416C",
        "Privacypolicy-text": "#717171",
        "Upload-bg": "#282828",
        "request-icon": "#BC0000",
        "payment-gray": "#717171",
        "request-button-accepted": "#28C76F",
        "request-button-notresponse": "#F79E1B",
        "request-button-decline": "#F1416C",
        "Privacypolicy-text": "#717171",
        "popup-gray": "#6E6B7B",

        
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "custom-light": "0px -2px 10px 4px rgba(133, 133, 133, 0.12)",
      },
    },
  },
  plugins: [],
};
