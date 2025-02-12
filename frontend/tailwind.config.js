// tailwind.config.js
module.exports = {  
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      width: {
        '100': '30rem', 
        '120': '35rem',
        '140': '40rem',        
        '180': '50rem',
      },
      height: {
        '100': '30rem', 
        '120': '35rem',
        '140': '40rem',        
        '180': '50rem',
      },      
    },
  },
  plugins: [],
}
