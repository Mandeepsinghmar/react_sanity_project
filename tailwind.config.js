module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        320: '320px',
      },
      width: {
        340: '340px',
        656: '656px',
        880: '880px',
        508: '508px',
      },
      height: {
        370: '370px',
        420: '420px',
        510: '510px',
        685: '685px',
        800: '800px',
        '90vh': '90vh',
      },
    },
    // height: {
    //   sm: '800px',
    // },

    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#F5F3F3',
      secondary: '#efefef',
    }),
    cursor: {
      'zoom-in': 'zoom-in',
    },
    fontFamily: {
      'logo-font': ['Qahiri', 'sans-serif'],
    },
  },
  variants: {
    backgroundColor: ['active'],
    extend: {},
  },
  plugins: [],
};
