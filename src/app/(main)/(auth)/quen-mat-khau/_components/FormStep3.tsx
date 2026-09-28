'use client'

import {useState, useTransition} from 'react'
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
import {Button} from '@/components/ui/button'
import {Eye, EyeOff} from 'lucide-react'
import {resetPassword} from '@/actions/resetPassword'

const step3Schema = z
  .object({
    password: z
      .string()
      .min(1, {
        message: 'Vui lòng nhập mật khẩu.',
      })
      .min(6, {
        message: 'Mật khẩu phải có ít nhất 6 ký tự.',
      }),
    confirmPassword: z.string().min(1, {
      message: 'Vui lòng nhập mật khẩu xác nhận.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp.',
    path: ['confirmPassword'],
  })

export default function FormStep3({
  handleStep,
  email,
  otp,
  setOpen,
}: {
  handleStep: (step: number) => void
  email: string
  otp: string
  setOpen: (open: boolean) => void
}) {
  const [pending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: z.infer<typeof step3Schema>) {
    if (pending) return
    startTransition(async () => {
      try {
        const res = await resetPassword({
          email,
          otp_code: otp,
          new_password: values.password,
        })
        if (res?.success) {
          handleStep(1)
          setOpen(true)
        } else if (res?.data?.status === 400) {
          form.setError('confirmPassword', {
            message: res?.message,
          })
        } else {
          toast.error(res?.message)
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
        Vui lòng thay đổi mật khẩu của bạn
      </span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-0'
        >
          <div className='space-y-5'>
            <FormField
              control={form.control}
              name='password'
              render={({field}) => (
                <FormItem className='space-y-2'>
                  <FormLabel className='label-label-1 text-white flex gap-0'>
                    Mật khẩu mới <ICRequired className='ml-1' />
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Nhập mật khẩu mới'
                        className='rounded-[0.5rem] border border-solid border-white/60 bg-[#101A49] input-field text-white placeholder:text-grey-200 outline-none focus:outline-none focus-visible:border-none h-[2.875rem]'
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye className='size-[1.25rem] text-white' />
                        ) : (
                          <EyeOff className='size-[1.25rem] text-white' />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({field}) => (
                <FormItem className='space-y-2'>
                  <FormLabel className='label-label-1 text-white flex gap-0'>
                    Xác nhận mật khẩu mới <ICRequired className='ml-1' />
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Xác nhận mật khẩu mới'
                        className='rounded-[0.5rem] border border-solid border-white/60 bg-[#101A49] input-field text-white placeholder:text-grey-200 outline-none focus:outline-none focus-visible:border-none h-[2.875rem]'
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <Eye className='size-[1.25rem] text-white' />
                        ) : (
                          <EyeOff className='size-[1.25rem] text-white' />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <span className='button-2 text-p3'>THAY ĐỔI MẬT KHẨU</span>
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
