'use client'
import FormSignUp from '@/app/(main)/(auth)/dang-ky/_components/FormSignUp'
import FormStep2 from '@/app/(main)/(auth)/dang-ky/_components/FormStep2'
import PopupSuccess from '@/components/shared/PopupSuccess'
import pathPage from '@/utils/pathPage'
import Link from 'next/link'
import {useSearchParams} from 'next/navigation'
import {useLayoutEffect, useState} from 'react'

export default function IndexRegister() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()

  useLayoutEffect(() => {
    const email = searchParams.get('email')
    if (email) {
      setEmail(email)
      setStep(2)
    }
  }, [searchParams])

  const handleStep = (step: number) => {
    setStep(step)
  }

  return (
    <>
      <div className='flex items-start space-x-5 mb-[1.88rem]'>
        <Link
          className='w-full text-center text-[1rem] font-semibold leading-[0.875rem] tracking-[0.01rem] text-white pb-3 border-b border-solid border-transparent'
          href={pathPage.signIn}
        >
          Đăng nhập
        </Link>
        <div className='w-[0.125rem] h-[0.75rem] rounded-[0.3125rem] opacity-30 bg-[#D9D9D9]'></div>
        <Link
          className='w-full text-center text-[1rem] font-semibold leading-[0.875rem] tracking-[0.01rem] text-p1 pb-3 border-b border-solid border-p1'
          href={pathPage.signUp}
        >
          Đăng ký
        </Link>
      </div>
      {step === 1 && (
        <FormSignUp
          handleStep={handleStep}
          setEmail={setEmail}
        />
      )}
      {step === 2 && (
        <FormStep2
          handleStep={handleStep}
          email={email}
          setOpen={setOpen}
        />
      )}
      <PopupSuccess
        open={open}
        setOpen={setOpen}
        title='Đăng ký tài khoản thành công'
        description='Bạn đã đăng ký thành công tài khoản. Đăng nhập ngay để bắt đầu trải nghiệm'
        buttonText='ĐĂNG NHẬP NGAY'
        buttonLink={pathPage.signIn}
      />
    </>
  )
}
