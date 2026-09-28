'use client'
import {cn} from '@/lib/utils'
import {DialogProvider} from '@/provider/DialogProvider'
import {X} from 'lucide-react'
import Link from 'next/link'

export default function PopupSuccess({
  open,
  setOpen,
  title,
  description,
  buttonText,
  buttonLink,
  hiddenIcon,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  description: string
  buttonText: string
  buttonLink: string
  hiddenIcon?: boolean
}) {
  return (
    <DialogProvider
      open={open}
      setOpen={setOpen}
      className='p-[1.25rem] rounded-[0.75rem] border border-solid border-white bg-[#0C0931] sm:w-[24.5rem] sm:max-w-[24.5rem] xsm:w-[21.4375rem] xsm:max-w-[21.4375rem]'
    >
      <button
        onClick={() => setOpen(false)}
        className='size-fit absolute top-2 right-2 active:scale-90 outline-0'
      >
        <X className='size-[2rem] text-white' />
      </button>
      <div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='34'
          height='34'
          viewBox='0 0 34 34'
          fill='none'
          className={cn('size-[2.5rem] mx-auto', hiddenIcon && 'hidden')}
        >
          <path
            d='M17.0007 0.333984C7.81732 0.333984 0.333984 7.81732 0.333984 17.0007C0.333984 26.184 7.81732 33.6673 17.0007 33.6673C26.184 33.6673 33.6673 26.184 33.6673 17.0007C33.6673 7.81732 26.184 0.333984 17.0007 0.333984ZM24.9673 13.1673L15.5173 22.6173C15.284 22.8507 14.9673 22.984 14.634 22.984C14.3007 22.984 13.984 22.8507 13.7507 22.6173L9.03398 17.9007C8.55065 17.4173 8.55065 16.6173 9.03398 16.134C9.51732 15.6506 10.3173 15.6506 10.8007 16.134L14.634 19.9673L23.2007 11.4007C23.684 10.9173 24.484 10.9173 24.9673 11.4007C25.4507 11.884 25.4507 12.6673 24.9673 13.1673Z'
            fill='#0FD249'
          />
        </svg>
        <h2 className='h5 text-white text-center mt-3 xsm:h6'>{title}</h2>
        <p className='body-1 xsm:body-2 text-grey-50 text-center mt-[0.62rem] mb-8 xsm:mt-2'>
          {description}
        </p>
        <Link
          href={buttonLink}
          className='w-full h-[2.75rem] rounded-[0.5rem] overflow-hidden relative bg-button-normal group block'
        >
          <div className='absolute size-full bg-button-hover z-[5] opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300'></div>
          <div className='flex items-center justify-center size-full relative z-10'>
            <span className='button-2 text-p3'>{buttonText}</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              className='size-[1rem] ml-2'
            >
              <path
                d='M3.33398 8H12.6673M12.6673 8L8.66732 4M12.6673 8L8.66732 12'
                stroke='#000117'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </Link>
      </div>
    </DialogProvider>
  )
}
