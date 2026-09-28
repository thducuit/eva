'use client'

import {Button} from '@/components/ui/button'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {ROUTES} from '@/lib/utils'
import pathPage from '@/utils/pathPage'
import {signOut, useSession} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'

export default function AuthLoginButton() {
  const {data: session} = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const handleLogout = async () => {
    await signOut({
      redirectTo: pathPage.signIn,
      redirect: true,
    })
  }
  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant={'tertiary'}
          text={'default'}
          className='flex-center space-x-[0.5rem] text-white h-[2.75rem] min-w-[13.875rem] uppercase xsm:min-w-[10rem]'
        >
          {session?.user?.first_name}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
          >
            <path
              d='M13.2787 5.9668L8.93208 10.3135C8.41875 10.8268 7.57875 10.8268 7.06542 10.3135L2.71875 5.9668'
              stroke='white'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side='top'
        className='border border-solid border-white bg-[#0C0931] shadow-[0_4px_24px_0_rgba(0,0,0,0.10)] w-[14.375rem] p-0 z-[999]'
      >
        <div>
          {ROUTES.map((route) => (
            <Link
              href={route.path}
              key={route.path}
              className='flex items-center rounded-[0.5rem] px-4 h-[2.75rem] transition-all duration-300 relative lg:hover:bg-[#3a6ca8]'
              onClick={() => setIsOpen(false)}
            >
              <Image
                className='w-[1.25rem] h-auto object-contain invert brightness-0'
                src={route.icon}
                alt=''
                width={24}
                height={24}
              />
              <span className='pl-2 text-[0.875rem] font-medium leading-[1.4] text-white'>
                {route.label}
              </span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className='flex items-center rounded-[0.5rem] px-4 h-[2.75rem] transition-all duration-300 relative w-full lg:hover:bg-[#3a6ca8]'
          >
            <Image
              className='w-[1.25rem] h-auto object-contain'
              src={'/user/logout.svg'}
              alt=''
              width={24}
              height={24}
            />
            <span className='pl-2 text-[0.875rem] font-medium leading-[1.4] text-[#EA6354] '>
              Đăng xuất
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
