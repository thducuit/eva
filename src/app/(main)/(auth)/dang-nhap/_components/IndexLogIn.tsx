import FormSignIn from '@/app/(main)/(auth)/dang-nhap/_components/FormSignIn'
import pathPage from '@/utils/pathPage'
import Link from 'next/link'

export default function IndexLogIn() {
  return (
    <>
      <div className='flex items-start space-x-5 xsm:space-x-4 mb-[1.88rem] xsm:mb-7'>
        <Link
          className='w-full text-center text-[1rem] font-semibold leading-[0.875rem] tracking-[0.01rem] text-p1 pb-3 border-b border-solid border-p1'
          href={pathPage.signIn}
        >
          Đăng nhập
        </Link>
        <div className='w-[0.125rem] h-[0.75rem] rounded-[0.3125rem] opacity-30 bg-[#D9D9D9]'></div>
        <Link
          className='w-full text-center text-[1rem] font-semibold leading-[0.875rem] tracking-[0.01rem] text-white border-b border-solid border-transparent pb-3'
          href={pathPage.signUp}
        >
          Đăng ký
        </Link>
      </div>
      <FormSignIn />
    </>
  )
}
