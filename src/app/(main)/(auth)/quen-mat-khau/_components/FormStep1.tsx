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
import {requestOTP} from '@/actions/requestOTP'

const step1Schema = z.object({
  email: z.string().email({
    message: 'Vui lòng nhập địa chỉ email hợp lệ.',
  }),
})

export default function FormStep1({
  handleStep,
  setEmail,
}: {
  handleStep: (step: number) => void
  setEmail: (email: string) => void
}) {
  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof step1Schema>) {
    if (pending) return
    startTransition(async () => {
      try {
        const res = await requestOTP(values.email)
        if (res?.data?.expires_in) {
          handleStep(2)
          setEmail(values.email)
        } else if (res?.data?.status === 429) {
          form.setError('email', {
            message: res?.message,
          })
        } else {
          form.setError('email', {
            message: 'Email không tồn tại trong hệ thống.',
          })
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Lỗi khi gửi mã OTP.')
      }
    })
  }

  return (
    <div className='w-full'>
      <span className='body-1 text-grey-50 mb-5 block'>
        Vui lòng điền tên đăng nhập tài khoản bạn muốn lấy lại mật khẩu
      </span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-0'
        >
          <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem className='space-y-2'>
                <FormLabel className='label-label-1 text-white flex gap-0'>
                  Email <ICRequired className='ml-1' />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Vui lòng nhập địa chỉ email'
                    className='rounded-[0.5rem] border border-solid border-white/60 bg-[#101A49] input-field text-white placeholder:text-grey-200 outline-none focus:outline-none focus-visible:border-none h-[2.875rem]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
