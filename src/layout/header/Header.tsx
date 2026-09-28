'use client'

import {ContactButton} from '@/components/ContactButton'
import {useScrollHeader} from '@/hooks/useScrollHeader'
import {AuthHoverButton} from '@/layout/header/_components/AuthHoverButton'
import {Logo} from '@/layout/header/_components/Logo'
import {MenuDropdown} from '@/layout/header/_components/MenuDropdown'
import {SearchDialog} from '@/layout/header/_components/SearchDialog'
import {IHeader} from '@/types/options.interface'
import {memo, useRef} from 'react'
import SheetHeaderUI from './_components/SheetHeader'
import {useSession} from 'next-auth/react'
import AuthLoginButton from '@/layout/header/_components/AuthLoginButton'

export const Header = memo(function Header({data}: {data: IHeader}) {
  const headerRef = useRef<HTMLElement>(null)
  useScrollHeader(headerRef as React.RefObject<HTMLElement>)
  const {data: session} = useSession()

  return (
    <header
      className='w-full xsm:py-[0.6875rem] rounded-[0.375rem] xsm:rounded-none pl-[1.25rem] xsm:top-0 bg-[#121030]/50 max-w-[87.5rem] xsm:w-full mx-auto flex justify-between items-center fixed z-[50] top-[1.25rem] left-0 right-0 xsm:px-[1.25rem] transition-transform duration-500 py-[0.125rem] backdrop-blur-[15px]'
      ref={headerRef}
    >
      <Logo logo={data?.logo} />

      <div className='p-[0.75rem_1rem] flex items-center justify-center space-x-[0.75rem] rounded-[0.75rem] xsm:hidden'>
        <SearchDialog logo={data?.logo} />

        <MenuDropdown items={data.menu} />

        {session?.accessToken ? <AuthLoginButton /> : <AuthHoverButton />}

        <ContactButton contact={data?.contact} />
      </div>

      <div className='xsm:block hidden'>
        <SheetHeaderUI data={data} />
      </div>
    </header>
  )
})
