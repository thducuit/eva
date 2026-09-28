import FormAccount from '@/app/(main)/(user)/tai-khoan/_components/FormAccount'
import {IUser} from '@/types/user.interface'
import pathPage from '@/utils/pathPage'
import Link from 'next/link'

export interface ApiUserResponse {
  success: boolean
  data: IUser
}

export default async function IndexAccount() {
  return (
    <>
      <Link
        href={pathPage.dashboard}
        className='sm:hidden flex items-center h-[3rem] rounded-[0.75rem] backdrop-blur-[6px] px-3 bg-[rgba(22,21,48,0.85)] mb-4'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          className='size-[1.5rem]'
        >
          <path
            d='M15 6L9 12L15 18'
            stroke='white'
            strokeWidth='2'
          />
        </svg>
        <span className='pl-1 text-[1rem] font-medium leading-[1.4] text-white'>
          Thông tin tài khoản
        </span>
      </Link>
      <FormAccount />
    </>
  )
}
