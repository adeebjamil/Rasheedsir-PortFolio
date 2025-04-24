/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'black': '#000000',
          'black-card': '#0a0a0a',
          'black-accent': '#111111',
          'accent-cyan': '#7bffee',
          'accent-pink': '#ff7bac',
          'accent-purple': '#b57bff',
          'accent-green': '#10e956',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        animation: {
          'spin-slow': 'spin 15s linear infinite',
        },
      },
    },
    plugins: [],
  }