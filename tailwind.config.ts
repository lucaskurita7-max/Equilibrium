import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F1413',
        panel: '#141B1A',
        panel2: '#0E1312',
        stroke: '#23302D',
        stroke2: '#1F2B28',
        brand: '#1F3D3A',
        brand2: '#0F2B27'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,.25)'
      }
    },
  },
  plugins: [],
}
export default config
