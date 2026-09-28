'use client'

import {useLayoutEffect, useTransition} from 'react'
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
import accountSchema from '@/schemas/account.schema'
import ICRequired from '@/components/icon/ICRequired'
import {toast} from 'sonner'
import {updateProfile} from '@/actions/updateProfile'
import {useSession} from 'next-auth/react'
import LoadingCircleSpin from '@/components/loading/LoadingCircleSpin'
import {cn} from '@/lib/utils'

export default function FormAccount() {
  const {data: session, update} = useSession()
  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      username: session?.user?.first_name || '',
      phone: session?.user?.phone || '',
      email: session?.user?.email,
      customerCode: session?.user?.customer_code || '',
    },
  })

  useLayoutEffect(() => {
    form.reset({
      username: session?.user?.first_name || '',
      phone: session?.user?.phone || '',
      email: session?.user?.email,
      customerCode: session?.user?.customer_code || '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  function onSubmit(values: z.infer<typeof accountSchema>) {
    if (pending) return
    startTransition(async () => {
      try {
        const res = await updateProfile({
          username: values.username,
          phone: values.phone,
          customer_code: values.customerCode ?? '',
        })
        if (res?.success && res?.user?.id) {
          await update({_action: 'updateInfo'})
          toast.success('Cập nhật thông tin thành công')
          return
        } else if (res?.code === 'customer_code_exists') {
          toast.error('Mã khách hàng không hợp lệ')
        } else {
          toast.error('Lỗi khi cập nhật thông tin')
          return
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Lỗi khi đăng nhập.')
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-0'
      >
        <div className='rounded-[0.75rem] bg-[rgba(22,21,48,0.85)] backdrop-blur-[10px] p-10 grid grid-cols-2 gap-y-7 gap-x-5 xsm:grid-cols-1 xsm:gap-y-5 xsm:p-[1.2rem_1rem]'>
          <FormField
            control={form.control}
            name='username'
            render={({field}) => (
              <FormItem className='space-y-2'>
                <FormLabel className='label-label-1 text-white flex gap-0'>
                  Tên của bạn <ICRequired className='ml-1' />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Trinh Van Duc'
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
            name='phone'
            render={({field}) => (
              <FormItem className='space-y-2'>
                <FormLabel className='label-label-1 text-white flex gap-0'>
                  Số điện thoại <ICRequired className='ml-1' />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='0123456789'
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
            name='email'
            disabled
            render={({field}) => (
              <FormItem className='space-y-2'>
                <FormLabel className='label-label-1 text-white flex gap-0'>
                  Email <ICRequired className='ml-1' />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='finnit.th@gmail.com'
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
            name='customerCode'
            render={({field}) => (
              <FormItem className='space-y-2'>
                <FormLabel className='label-label-1 text-white flex gap-0'>
                  Mã khách hàng
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='KH12345678'
                    className='rounded-[0.5rem] border border-solid border-white/60 bg-[#101A49] input-field text-white placeholder:text-grey-200 outline-none focus:outline-none focus-visible:border-none h-[2.875rem]'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='opacity-0'>
                  {form.formState.errors.email?.message}
                </FormMessage>
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
              CẬP NHẬT THÔNG TIN
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
