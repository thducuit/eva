'use client'
import {resendRegisterOTP} from '@/actions/resendRegisterOTP'
import LoadingCircleSpin from '@/components/loading/LoadingCircleSpin'
import {cn} from '@/lib/utils'
import {DialogProvider} from '@/provider/DialogProvider'
import {X} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {useTransition} from 'react'
import {toast} from 'sonner'

export default function VerifyEmail({
  open,
  setOpen,
  email,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  email: string
}) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleResendOTP = async () => {
    if (pending) return
    startTransition(async () => {
      try {
        const res = await resendRegisterOTP(email)
        if (res?.data?.status === 404) {
          toast.error('Email không tồn tại trong hệ thống.')
        } else if (res?.success) {
          toast.success('Mã xác thực đã được gửi đến email')
          router.push(`/dang-ky?email=${email}`)
        } else {
          toast.error('Lỗi khi gửi lại mã xác thực')
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Lỗi khi gửi lại mã xác thực.')
      }
    })
  }
  return (
    <DialogProvider
      open={open}
      setOpen={setOpen}
      className='p-[1.25rem] rounded-[0.75rem] border border-solid border-white bg-[#0C0931] sm:w-[24.5rem] sm:max-w-[24.5rem] xsm:w-[21.4375rem] xsm:max-w-[21.4375rem]'
    >
      <button
        onClick={() => setOpen(false)}
        className='size-fit absolute top-2 right-2 active:scale-90 outline-0'
      >
        <X className='size-[2rem] text-white' />
      </button>
      <div>
        <h2 className='h5 text-white text-center mt-3 xsm:h6'>
          Email chưa được xác thực
        </h2>
        <p className='body-1 xsm:body-2 text-grey-50 text-center mt-[0.62rem] mb-8 xsm:mt-2'>
          Vui lòng xác thực email để tiếp tục trải nghiệm
        </p>
        <button
          disabled={pending}
          onClick={handleResendOTP}
          className='w-full h-[2.75rem] rounded-[0.5rem] overflow-hidden relative bg-button-normal group block disabled:cursor-not-allowed'
        >
          <div className='absolute size-full bg-button-hover z-[5] opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300'></div>
          <div className='flex items-center justify-center size-full relative z-10'>
            {pending && (
              <LoadingCircleSpin className='size-[1.75rem] absolute-center' />
            )}
            <span className={cn('button-2 text-p3', pending && 'opacity-0')}>
              Xác thực email
            </span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              className={cn('size-[1rem] ml-2', pending && 'opacity-0')}
            >
              <path
                d='M3.33398 8H12.6673M12.6673 8L8.66732 4M12.6673 8L8.66732 12'
                stroke='#000117'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </button>
      </div>
    </DialogProvider>
  )
}
