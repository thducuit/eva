'use client'

import FormStep1 from '@/app/(main)/(auth)/quen-mat-khau/_components/FormStep1'
import PopupSuccess from '@/components/shared/PopupSuccess'

import pathPage from '@/utils/pathPage'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {useState} from 'react'

const FormStep2 = dynamic(
  () => import('@/app/(main)/(auth)/quen-mat-khau/_components/FormStep2'),
  {
    ssr: false,
  },
)
const FormStep3 = dynamic(
  () => import('@/app/(main)/(auth)/quen-mat-khau/_components/FormStep3'),
  {
    ssr: false,
  },
)

export default function IndexForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState<string | null>('')
  const [otp, setOtp] = useState<string | null>('')
  const [open, setOpen] = useState(false)

  const handleStep = (step: number) => {
    setStep(step)
  }

  return (
    <div>
      <Link
        href={pathPage.signIn}
        className='flex items-center mb-[1.875rem]'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='25'
          viewBox='0 0 24 25'
          fill='none'
          className='size-[1.5rem]'
        >
          <path
            d='M19 12.5H5M5 12.5L11 6.5M5 12.5L11 18.5'
            stroke='white'
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <span className='pl-2 text-[1.5rem] font-semibold leading-normal tracking-[0.015rem] text-white'>
          Quên mật khẩu
        </span>
      </Link>
      {step === 1 && (
        <FormStep1
          handleStep={handleStep}
          setEmail={setEmail}
        />
      )}
      {step === 2 && email && (
        <FormStep2
          handleStep={handleStep}
          email={email}
          setOtp={setOtp}
        />
      )}
      {step === 3 && otp && email && (
        <FormStep3
          handleStep={handleStep}
          email={email}
          otp={otp}
          setOpen={setOpen}
        />
      )}
      <PopupSuccess
        open={open}
        setOpen={setOpen}
        title='Thay đổi mật khẩu thành công'
        description='Mật khẩu của bạn đã được thay đổi thành công. Đăng nhập ngay để bắt đầu trải nghiệm'
        buttonText='ĐĂNG NHẬP'
        buttonLink={pathPage.signIn}
      />
    </div>
  )
}
