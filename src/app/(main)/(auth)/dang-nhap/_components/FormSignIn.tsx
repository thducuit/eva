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
import {loginForm} from '@/actions/loginForm'
import signInSchema from '@/schemas/signIn.schema'
import {useRouter} from 'next/navigation'
import {signIn, useSession} from 'next-auth/react'
import pathPage from '@/utils/pathPage'
import LoadingCircleSpin from '@/components/loading/LoadingCircleSpin'
import ICRequired from '@/components/icon/ICRequired'
import {Label} from '@/components/ui/label'
import {Checkbox} from '@/components/ui/checkbox'
import Link from 'next/link'
import Image from 'next/image'
import {toast} from 'sonner'
import VerifyEmail from '@/app/(main)/(auth)/dang-nhap/_components/VerifyEmail'

export default function FormSignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [pending, startTransition] = useTransition()
  const {update} = useSession()

  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof signInSchema>) {
    if (pending) return
    startTransition(async () => {
      try {
        const res = await loginForm(values)
        if (res?.ok) {
          // Force session re-fetch so data is immediately available
          await update()
          router.replace(pathPage.home)
          return
        } else {
          if (
            typeof res?.cause === 'string' &&
            res.cause.includes('email_not_verified')
          ) {
            setEmail(values.email)
            setOpen(true)
            form.setError('email', {
              message: 'Email chưa được xác thực',
            })
            return
          } else {
            form.setError('password', {
              message: 'Mật khẩu hoặc email không chính xác',
            })
            form.setError('email', {
              message: '',
            })
            return
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Lỗi khi đăng nhập.')
      }
    })
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-0'
        >
          <div className='space-y-5 mb-[1.88rem] xsm:mb-[1.75rem]'>
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
                      placeholder='example@gmail.com'
                      className='rounded-[0.5rem] border border-solid border-white/60 bg-[#101A49] input-field text-white placeholder:text-grey-200 outline-none focus:outline-none focus-visible:border-none h-[2.875rem]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({field}) => (
                <FormItem>
                  <FormLabel className='label-label-1 text-white flex gap-0'>
                    Password <ICRequired className='ml-1' />
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
            <div className='sm:h-[2.25rem] flex items-center justify-between'>
              <Label
                htmlFor='terms'
                className='cursor-pointer '
              >
                <Checkbox
                  id='terms'
                  className='data-[state=checked]:bg-transparent data-[state=checked]:border-[#6BF5FF] data-[state=checked]:text-[#6BF5FF]'
                />
                <span className='text-grey-50 sub-2'>Duy trì đăng nhập</span>
              </Label>
              <Link
                href={pathPage.forgotPassword}
                className='text-[#6BF5FF] sub-2'
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>

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
                  <span className='button-2 text-p3'>ĐĂNG NHẬP</span>
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
      <div className='flex items-center justify-center my-7 xsm:my-[0.88rem]'>
        <div className='rounded-[0.3125rem] opacity-30 bg-[#d9d9d9] h-[0.125rem] w-full'></div>
        <span className='px-3 body-2 text-white'>Hoặc</span>
        <div className='rounded-[0.3125rem] opacity-30 bg-[#d9d9d9] h-[0.125rem] w-full'></div>
      </div>
      <button
        onClick={() => signIn('google', {callbackUrl: pathPage.home})}
        className='flex items-center justify-center rounded-[0.5rem] border-[0.5px] border-solid border-p1 h-[2.75rem] w-full'
      >
        <Image
          className='w-[1rem] h-auto object-contain'
          src='/auth/logo-gg.svg'
          alt=''
          width={24}
          height={24}
        />
        <span className='pl-2 text-p1 button-2'>
          ĐĂNG NHẬP BẰNG TÀI KHOẢN GOOGLE
        </span>
      </button>
      <VerifyEmail
        open={open}
        setOpen={setOpen}
        email={email}
      />
    </div>
  )
}
