/* eslint-disable vue/max-len */
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
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    content: 'max-w-[540px] mx-auto',
    modal: {
      '@apply':
        'fixed top-[50%] left-[50%] max-w-[600px] max-h-full p-6 bg-white z-5 md:p-40px',
      transform: 'translate(-50%, -50%)',
      'box-shadow': '0 0 20px rgb(0 0 0 / 25%)',
      width: 'calc(100vw - 40px)',
    },
    'modal-wrapper': {
      '@apply':
        'absolute top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-20 z-5',
    },
    'btn-close':
      'absolute h-[36px] w-[36px] top-0 right-0 font-bold text-white uppercase cursor-pointer bg-hcsBlue md:font-14px',
    'team-image': 'block mx-auto w-50px h-50px object-contain',
  },
})
