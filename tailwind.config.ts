import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      sm: '640px',
      lg: {
        min: '1024px',
      },
      xlg: {
        max: '1024px',
      },
      xsm: {
        max: '639px',
      },
      tablet: {
        min: '640px',
        max: '1024px',
      },
    },
    extend: {
      colors: {
        'grey-50': '#EFEFEF',
        'grey-200': '#B4B4B4',
        'p3': '#000117',
        'p1': '#F6E280',
        'error-red-400': '#E64533'
      },
      backgroundImage: {
        'button-normal': 'linear-gradient(107deg, #F6E280 -0.32%, #FFF8D8 98.72%)',
        'button-hover': 'linear-gradient(107deg, #FFC096 -0.32%, #FFFBE6 98.72%)',
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.flex-center': {
          '@apply flex items-center justify-center': {},
        },
        '.absolute-center': {
          '@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2':
            {},
        },
        '.absolute-x-center': {
          '@apply absolute left-1/2 -translate-x-1/2': {},
        },
        '.absolute-y-center': {
          '@apply absolute top-1/2 -translate-y-1/2': {},
        },
        '.label-label-1': {
          '@apply text-[0.875rem] font-semibold leading-[1] tracking-[0.00875rem]': {}
        },
        '.input-field': {
          '@apply text-[0.875rem] font-normal leading-[1.57]': {}
        },
        '.button-2': {
          '@apply text-[0.875rem] font-semibold leading-[1] tracking-[0.00875rem]': {}
        },
        '.h5': {
          '@apply text-[1.5rem] font-semibold leading-[1.25]': {}
        },
        '.sub-2': {
          '@apply text-[0.875rem] font-medium leading-[1.42] tracking-[0.00875rem]': {}
        },
        '.body-2': {
          '@apply text-[0.875rem] font-normal leading-[1.57] tracking-[0.00219rem]': {}
        },
        '.body-1': {
          '@apply text-[1rem] font-normal leading-normal tracking-[0.0025rem]': {}
        },
        '.h6': {
          '@apply text-[1.25rem] font-semibold leading-[1.3]': {}
        },
      })
    }),
  ],
}
export default config
