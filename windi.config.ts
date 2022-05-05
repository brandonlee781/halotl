import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hcsBlue: '#4e78ba',
        hcsRed: '#ec3724',
        correct: '#37be75',
        close: '#f4e878',
      },
    },
  },
  alias: {
    btn: 'px-4 py-2 mr-2 rounded-md hover:outline',
    card: 'shadow border-b border-gray-200',
  },
})
