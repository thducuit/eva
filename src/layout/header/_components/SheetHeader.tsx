'use client'

import {ContactButton} from '@/components/ContactButton'
import {MenuIcon, SearchIcon, XIcon} from '@/components/icon'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {AuthHoverButton} from '@/layout/header/_components/AuthHoverButton'
import Image from 'next/image'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import {usePathname} from 'next/navigation'
import {IHeader} from '@/types/options.interface'
import {useSession} from 'next-auth/react'
import AuthLoginButtonMB from '@/layout/header/_components/AuthLoginButtonMB'

const SheetHeaderUI = ({data}: {data: IHeader}) => {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const {data: session} = useSession()

  useEffect(() => {
    setOpen(false)
    setSearchOpen(false)
  }, [pathname])

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          setSearchOpen(false)
        }
      }}
    >
      <SheetTrigger
        className='hidden! xsm:block'
        asChild
      >
        <Button
          className='size-[2.75rem] has-[>svg]:p-0 items-center justify-center flex! '
          variant={'tertiary'}
        >
          <MenuIcon className='size-4' />
        </Button>
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='pb-[2.5rem] rounded-t-[0.5rem] bg-[#23214D]/45 backdrop-blur-[10px] border-none px-[1.25rem]'
        closeButton={false}
      >
        <SheetHeader className='py-[1.125rem] px-0'>
          <SheetTitle className='flex items-center justify-between'>
            <div
              className={`flex items-center transition-all bg-[#101A49] rounded-[0.5rem] duration-300 ease-in-out ${
                searchOpen ? 'w-[17.5625rem]' : 'w-[2.75rem]'
              }`}
            >
              <Button
                variant={'tertiary'}
                className={`size-[2.75rem] flex-shrink-0 transition-all duration-300 ease-in-out ${
                  searchOpen ? 'rounded-r-none' : 'rounded-[0.5rem]'
                }`}
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <SearchIcon className='size-4' />
              </Button>
              {searchOpen && (
                <div className='flex-1 overflow-hidden ml-[-1rem]'>
                  <Input
                    className='h-[2.75rem] focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-white border-none placeholder:text-[0.75rem] placeholder:text-white/50 placeholder:font-semibold placeholder:tracking-[0.0075rem] placeholder:leading-[0.75rem]
                placeholder:uppercase text-[0.75rem] font-semibold tracking-[0.0075rem] leading-[0.75rem]'
                    placeholder='Tìm kiếm...'
                    autoFocus
                  />
                </div>
              )}
            </div>

            <Button
              variant={'ghost'}
              onClick={() => {
                setOpen(false)
                setSearchOpen(false)
              }}
              className='p-0 has-[>svg]:p-0 mr-[-0.5rem]'
            >
              <XIcon className='size-[2.25rem]' />
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className='flex space-x-4 mb-[0.75rem]'>
          {session?.accessToken ? <AuthLoginButtonMB /> : <AuthHoverButton />}
          <ContactButton
            contact={data?.contact}
            className='w-[9.9375rem]'
          />
        </div>

        <div className='flex flex-col space-y-[0.75rem]'>
          {data?.menu.map((item, index) => (
            <Link
              key={index}
              href={item.page.url}
              onClick={() => {
                setOpen(false)
                setSearchOpen(false)
              }}
            >
              <div className='h-[5.25rem] w-full rounded-[0.5rem] border-[1px] border-white/50 bg-[#100F27] backdrop-blur-[3px] relative overflow-hidden flex'>
                <div className='size-[4.5625rem] bg-[#FFAF69] blur-[50px] absolute top-[-2.6875rem] left-[-2.125rem]' />
                <div className='pl-[1.25rem] pt-[1.25rem] flex flex-col space-y-[0.375rem] text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00875rem] text-white uppercase relative z-[1]'>
                  <p>0{index + 1}</p>
                  <p>{item.page.title}</p>
                </div>
                <div className='h-full w-[8rem] absolute right-0 bottom-0'>
                  <div
                    className='h-full w-[2.375rem] absolute bottom-0 left-0'
                    style={{
                      background:
                        'linear-gradient(270deg, rgba(19, 18, 40, 0.00) 0%, #131228 100%)',
                    }}
                  />
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    width={128}
                    height={100}
                    className='h-[5.875rem] w-[8rem] object-cover'
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SheetHeaderUI
