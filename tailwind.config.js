module.exports = {
  purge: {
    // enabled: true,
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: [/^Calendar/, /^DateInput/, /^DayPicke/, /^DateRangePicker/],
    },
  },
  // darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      gridTemplateColumns: {
        shell: '560px 1fr',
      },
      gridTemplateRows: {
        shell: '1fr 120px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
