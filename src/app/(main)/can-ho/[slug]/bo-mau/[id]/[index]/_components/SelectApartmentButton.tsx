'use client'

import ContactForm from '@/app/(main)/lien-he-tu-van/_components/form'
import {Button} from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'

const SelectApartmentButton = ({
  openSelectApartment,
  setOpenSelectApartment,
}: {
  openSelectApartment: boolean
  setOpenSelectApartment: (open: boolean) => void
}) => {
  return (
    <Sheet
      open={openSelectApartment}
      onOpenChange={setOpenSelectApartment}
    >
      <SheetTrigger asChild>
        <Button
          variant={'tertiary'}
          text={'default'}
          className='uppercase text-white w-[9.9375rem] h-[2.75rem]'
        >
          Chọn căn hộ
        </Button>
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='pb-[1.9375rem] xsm:pb-0 bg-[#000117]/90 border-none focus:outline-none focus:ring-0 ring-0 ring-offset-0 xsm:h-auto xsm:rounded-t-[0.375rem] xsm:border-[#dbdbdb]/30 xsm:overflow-hidden'
        closeButton={false}
      >
        <div className='relative overflow-hidden w-full h-full'>
          <div className='w-[95.8125rem] h-[12.5rem] absolute left-1/2 -translate-x-1/2 top-[-8.125rem] rounded-full opacity-40 bg-[linear-gradient(180deg,_#A6762C_0%,_#F0D977_100%)] blur-[100px] z-[1] xsm:opacity-80 xsm:top-[-10.125rem] xsm:rounded-t-[0.375rem]' />
          <SheetHeader className='pt-[1.75rem] px-[6.25rem] relative pb-0 z-[2] mb-[1.5rem] flex flex-row items-center justify-between xsm:items-start xsm:pt-[1.25rem] xsm:px-[1.25rem] xsm:mb-[1.25rem]'>
            <SheetTitle className='text-[1.25rem] text-[#EFEFEF] font-semibold leading-[1.625rem] uppercase'>
              Chọn căn hộ
            </SheetTitle>
            <button onClick={() => setOpenSelectApartment(false)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                className='size-[1.125rem]'
              >
                <path
                  d='M18.9999 18.9999L10 10M10 10L1 1M10 10L19.0001 1M10 10L1 19.0001'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </SheetHeader>
          <div className='w-full relative z-10 xsm:px-4'>
            <div className='sm:w-[87.5rem]  mx-auto bg-[rgb(18,16,48)] rounded-[0.75rem] xsm:backdrop-blur-[3px] p-8 overflow-hidden relative xsm:p-[1.5rem_1rem]'>
              <div className='sm:w-[40.6rem] relative z-10'>
                <ContactForm setOpen={setOpenSelectApartment} />
              </div>
              <Image
                className='absolute top-0 right-[-19.5%] size-full object-contain xsm:hidden'
                src='/auth/bg-form.png'
                alt=''
                quality={95}
                width={890}
                height={600}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SelectApartmentButton
