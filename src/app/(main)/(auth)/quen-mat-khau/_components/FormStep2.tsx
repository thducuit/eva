'use client'

import {useTransition} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Input} from '@/components/ui/input'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import LoadingCircleSpin from '@/components/loading/LoadingCircleSpin'
import ICRequired from '@/components/icon/ICRequired'
import {toast} from 'sonner'
import ResendButton from './ResendButton'
import {verifyOTP} from '@/actions/verifyOTP'

const step2Schema = z.object({
  otp: z.string().regex(/^\d{6}$/, {
    message: 'Mã OTP phải có 6 chữ số.',
  }),
})

export default function FormStep2({
  handleStep,
  email,
  setOtp,
}: {
  handleStep: (step: number) => void
  email: string
  setOtp: (otp: string) => void
}) {
  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      otp: '',
    },
  })

  function onSubmit(values: z.infer<typeof step2Schema>) {
    if (pending) return
    startTransition(async () => {
      try {
        const res = await verifyOTP({email, otp_code: values.otp})
        if (res?.data?.verified) {
          handleStep(3)
          setOtp(values.otp)
        } else {
          form.setError('otp', {
            message: 'Mã OTP không hợp lệ.',
          })
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Lỗi khi xác thực mã OTP.')
      }
    })
  }

  return (
    <div className='w-full'>
      <span className='body-1 text-grey-50 mb-5 block'>
        Nhập mã được gửi vào Email: <br className='sm:hidden' />
        <strong>{email}</strong>
      </span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-0'
        >
          <FormField
            control={form.control}
            name='otp'
            render={({field}) => (
              <FormItem className='space-y-2'>
                <FormLabel className='label-label-1 text-white flex gap-0'>
                  Nhập mã xác thực <ICRequired className='ml-1' />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nhập mã gồm 6 chữ số'
                    className='rounded-[0.5rem] border border-solid border-white/60 bg-[#101A49] input-field text-white placeholder:text-grey-200 outline-none focus:outline-none focus-visible:border-none h-[2.875rem]'
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                      // Only allow digits 0-9 and limit to 6 characters
                      const filteredValue = value
                        .replace(/[^0-9]/g, '')
                        .slice(0, 6)
                      field.onChange(filteredValue) // Update the form field with the filtered value
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex sm:items-center sm:justify-between mt-5 sub-2 xsm:flex-col '>
            <span className=' text-white'>Bạn chưa nhận được mã xác thực?</span>
            <ResendButton email={email} />
          </div>

          <button
            type='submit'
            disabled={pending}
            className='w-full h-[2.75rem] rounded-[0.5rem] overflow-hidden relative bg-button-normal group mt-[1.88rem] disabled:cursor-not-allowed'
          >
            <div className='absolute size-full bg-button-hover z-[5] opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300'></div>
            <div className='flex items-center justify-center size-full relative z-10'>
              {pending ? (
                <LoadingCircleSpin className='size-[1.75rem]' />
              ) : (
                <>
                  <span className='button-2 text-p3'>TIẾP THEO</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    className='size-[1rem] ml-2'
                  >
                    <path
                      d='M3.33398 8H12.6673M12.6673 8L8.66732 4M12.6673 8L8.66732 12'
                      stroke='#000117'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </>
              )}
            </div>
          </button>
        </form>
      </Form>
    </div>
  )
}
