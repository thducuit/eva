import localFont from 'next/font/local'

export const gilroy = localFont({
  src: [
    {
      path: './SVN-Gilroy Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './SVN-Gilroy Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './SVN-Gilroy Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './SVN-Gilroy SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-gilroy',
  preload: true,
})
