'use client'
import {cn, ROUTES} from '@/lib/utils'
import pathPage from '@/utils/pathPage'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {signOut, useSession} from 'next-auth/react'

export default function Aside() {
  const pathname = usePathname()
  const {data: session} = useSession()

  const handleLogout = async () => {
    await signOut({
      redirectTo: pathPage.signIn,
      redirect: true,
    })
  }
  return (
    <aside
      id='aside_dashboard'
      className='w-[19.375rem] xsm:w-full sticky top-[7rem] xsm:relative xsm:top-0 left-0 shrink-0 h-fit xsm:hidden xsm:px-4'
    >
      <div className='rounded-[0.75rem] bg-[rgba(18,16,48,0.85)] backdrop-blur-[6px] p-4'>
        <span className='text-[0.875rem] font-medium leading-[1.4] text-white'>
          Xin chào bạn!
        </span>
        <div className='h-[1px] w-full my-2 bg-white/20'></div>
        <span className='text-[1rem] font-medium leading-[1.4] text-white'>
          {session?.user?.first_name}
        </span>
        <span className='block mt-[0.12rem] text-[0.875rem] text-grey-200 leading-[1.4] font-normal'>
          {session?.user?.email}
        </span>
      </div>

      <div className='rounded-[0.75rem] p-[0.625rem] backdrop-blur-[6px] bg-[rgba(18,16,48,0.85)] mt-4 space-y-2'>
        {ROUTES.map((route) => (
          <Link
            href={route.path}
            key={route.path}
            className={cn(
              'flex items-center rounded-[0.5rem] px-4 h-[2.75rem] transition-all duration-300 relative',
              pathname === route.path && 'bg-p1',
            )}
          >
            <Image
              className={cn(
                'w-[1.25rem] h-auto object-contain',
                pathname !== route.path && 'invert brightness-0',
              )}
              src={route.icon}
              alt=''
              width={24}
              height={24}
            />
            <span
              className={cn(
                'pl-2 text-[0.875rem] font-medium leading-[1.4]',
                pathname === route.path ? '#030303' : 'text-white',
              )}
            >
              {route.label}
            </span>
            <Image
              className={cn(
                'absolute bottom-0 right-[0.19rem] transition-all duration-300 opacity-0 w-[3.1875rem] h-auto',
                pathname === route.path && 'opacity-100',
              )}
              src='/user/building.png'
              alt=''
              width={51}
              height={56}
            />
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className='flex items-center rounded-[0.5rem] px-4 h-[2.75rem] transition-all duration-300 relative w-full'
        >
          <Image
            className='w-[1.25rem] h-auto object-contain'
            src={'/user/logout.svg'}
            alt=''
            width={24}
            height={24}
          />
          <span className='pl-2 text-[0.875rem] font-medium leading-[1.4] text-[#EA6354]'>
            Đăng xuất
          </span>
        </button>
      </div>
    </aside>
  )
}
