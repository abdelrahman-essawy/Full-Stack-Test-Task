const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        background: {
          light: '#FAFAFA',
          DEFAULT: '#FFFFFF',
          dark: '#363E4E',
          soft: '#F5F5F6',
          extraSoft: '#F5F7FB',
        },
        primary: '#F0754D',
        success: '#4CAF50',
        text: {
          DEFAULT: '#363E4E',
          primary: '#F0754D',
          inverted: '#FFFFFF',
          muted: '#848FA3',
          dark: '#000000',
          accent: '#FC794B',
          secondary: '#33475B',
          disabled: '#AAAAAA',
        },
      },
    },
  },
  plugins: [],
};
