'use client'

import {useState, useTransition} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Eye, EyeOff} from 'lucide-react'
import {Button} from '@/components/ui/button'
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
import ICRequired from '@/components/icon/ICRequired'
import {registerForm} from '@/actions/registerForm'
import LoadingCircleSpin from '@/components/loading/LoadingCircleSpin'
import signUpSchema from '@/schemas/signUp.schema'
import {toast} from 'sonner'
import {cn} from '@/lib/utils'
import useIsMobile from '@/hooks/useIsMobile'

export default function FormSignUp({
  handleStep,
  setEmail,
}: {
  handleStep: (step: number) => void
  setEmail: (email: string) => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const isMobile = useIsMobile()

  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      username: '',
      customerCode: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    if (pending) return
    const submitValues = {
      first_name: values.username,
      username: values.username,
      email: values.email,
      password: values.password,
      customer_code: values.customerCode ?? '',
    }
    startTransition(async () => {
      try {
        const res = await registerForm(submitValues)
        if (res?.data?.id) {
          handleStep(2)
          setEmail(values.email)
          form.reset()
        } else if (res?.code === 'customer_code_exists') {
          form.setError('customerCode', {
            message: 'Mã khách hàng không hợp lệ',
          })
        } else if (res?.data?.status === 400) {
          if (res?.message?.includes('Username')) {
            form.setError('username', {
              message: res?.message,
            })
          } else if (res?.message?.includes('Email')) {
            form.setError('email', {
              message: res?.message,
            })
          }
        } else {
          toast.error(
            res ? JSON.stringify(res) : 'Có lỗi xảy ra khi đăng ký tài khoản.',
          )
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Có lỗi xảy ra khi đăng ký tài khoản.')
      }
    })
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-5'
        >
          <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem>
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
          <div className='flex sm:space-x-4 sm:items-end xsm:flex-col xsm:space-y-5'>
            <FormField
              control={form.control}
              name='username'
              render={({field}) => (
                <FormItem className='w-full'>
                  <FormLabel className='label-label-1 text-white flex gap-0'>
                    Tên của bạn
                    <ICRequired className='ml-1' />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Vui lòng nhập tên của bạn'
                      className='rounded-[0.5rem] border border-solid border-white/60 bg-[#101A49] input-field text-white placeholder:text-grey-200 outline-none focus:outline-none focus-visible:border-none h-[2.875rem]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      form.formState.errors.customerCode?.message &&
                        !form.formState.errors.username?.message &&
                        'opacity-0',
                      isMobile &&
                        form.formState.errors.customerCode?.message &&
                        !form.formState.errors.username?.message
                        ? 'xsm:hidden'
                        : '',
                    )}
                  >
                    {form.formState.errors.username?.message ||
                      form.formState.errors.customerCode?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='customerCode'
              render={({field}) => (
                <FormItem className='w-full'>
                  <FormLabel className='label-label-1 text-white flex gap-0'>
                    Mã khách hàng <ICRequired className='ml-1 opacity-0' />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Mã khách hàng ( Nếu có )'
                      className='rounded-[0.5rem] border border-solid border-white/60 bg-[#101A49] input-field text-white placeholder:text-grey-200 outline-none focus:outline-none focus-visible:border-none h-[2.875rem]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      'opacity-0',
                      form.formState.errors.customerCode?.message &&
                        'opacity-100',
                      isMobile &&
                        !form.formState.errors.customerCode?.message &&
                        'xsm:hidden',
                    )}
                  >
                    {form.formState.errors.customerCode?.message ||
                      form.formState.errors.username?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='password'
            render={({field}) => (
              <FormItem>
                <FormLabel className='label-label-1 text-white flex gap-0'>
                  Mật khẩu <ICRequired className='ml-1' />
                </FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
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
              <FormItem>
                <FormLabel className='label-label-1 text-white flex gap-0'>
                  Xác nhận lại mật khẩu
                  <ICRequired className='ml-1' />
                </FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='••••••••'
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

          <button
            type='submit'
            disabled={pending}
            className='w-full h-[2.75rem] rounded-[0.5rem] overflow-hidden relative bg-button-normal group disabled:cursor-not-allowed'
          >
            <div className='absolute size-full bg-button-hover z-[5] opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300'></div>
            <div className='flex items-center justify-center size-full relative z-10'>
              {pending ? (
                <LoadingCircleSpin className='size-[1.75rem]' />
              ) : (
                <>
                  <span className='button-2 text-p3'>ĐĂNG KÝ TÀI KHOẢN</span>
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
