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
import ICRequired from '@/components/icon/ICRequired'
import changePasswordSchema from '@/schemas/changePassword.schema'
import {Button} from '@/components/ui/button'
import {Eye, EyeOff} from 'lucide-react'
import LoadingCircleSpin from '@/components/loading/LoadingCircleSpin'
import {cn} from '@/lib/utils'
import {changePassword} from '@/actions/changePassword'
import {toast} from 'sonner'

export default function FormChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    if (pending) return
    startTransition(async () => {
      try {
        const res = await changePassword({
          current_password: values.oldPassword,
          new_password: values.password,
        })
        if (res?.success) {
          toast.success('Thay đổi mật khẩu thành công')
          form.reset()
          return
        } else {
          form.setError('oldPassword', {
            message: 'Mật khẩu hiện tại không chính xác',
          })
          return
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Lỗi khi thay đổi mật khẩu')
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-0'
      >
        <div className='rounded-[0.75rem] bg-[rgba(22,21,48,0.85)] backdrop-blur-[10px] p-10 grid grid-cols-1 gap-y-5 xsm:grid-cols-1 xsm:gap-y-5 xsm:p-[1.2rem_1rem]'>
          <FormField
            control={form.control}
            name='oldPassword'
            render={({field}) => (
              <FormItem className='space-y-2'>
                <FormLabel className='label-label-1 text-white flex gap-0'>
                  Mật khẩu hiện tại <ICRequired className='ml-1' />
                </FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showOldPassword ? 'text' : 'password'}
                      placeholder='Nhập mật khẩu hiện tại'
                      className='rounded-[0.5rem] border border-solid border-white/60 bg-[#101A49] input-field text-white placeholder:text-grey-200 outline-none focus:outline-none focus-visible:border-none h-[2.875rem]'
                      {...field}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? (
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
          className='h-[2.75rem] rounded-[0.5rem] overflow-hidden bg-button-normal group px-6 mt-4 ml-auto w-fit relative block xsm:w-full disabled:cursor-not-allowed'
        >
          <div className='absolute left-0 size-full bg-button-hover z-[5] opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300'></div>
          <div className='flex items-center justify-center size-full relative z-10'>
            {pending && (
              <LoadingCircleSpin className='size-[1.75rem] absolute-center' />
            )}
            <span className={cn('button-2 text-p3', pending && 'opacity-0')}>
              THAY ĐỔI MẬT KHẨU
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
      </form>
    </Form>
  )
}
