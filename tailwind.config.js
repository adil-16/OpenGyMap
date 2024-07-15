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
      },
    },
  },
  plugins: [],
};
