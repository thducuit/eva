'use client'

import {Button} from '@/components/ui/button'
import {GoogleIcon, UserIcon} from '@/components/icon'
import {useState} from 'react'
import Link from 'next/link'
import useIsMobile from '@/hooks/useIsMobile'
import pathPage from '@/utils/pathPage'

type AuthHoverButtonProps = {
  label?: string
}

export const AuthHoverButton = ({
  label = 'Đăng ký/Đăng nhập',
}: AuthHoverButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useIsMobile()

  return (
    <Button
      variant={'tertiary'}
      text={'default'}
      className='flex-center space-x-[0.5rem] text-white h-[2.75rem] w-[13.875rem] uppercase xsm:w-[10rem]'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={pathPage.signIn}
        className='flex items-center justify-center space-x-[0.5rem] xsm:space-x-[0.25rem]'
      >
        <div className='relative'>
          <div
            className={`transition-opacity duration-500 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {isMobile ? (
              <UserIcon className='size-4 xsm:size-[0.875rem]' />
            ) : (
              <GoogleIcon className='size-4' />
            )}
          </div>
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <UserIcon className='size-4' />
          </div>
        </div>
        <span>{label}</span>
      </Link>
    </Button>
  )
}
