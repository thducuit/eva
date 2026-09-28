'use client'

import {ArrowRightIcon} from '@/components/icon'
import {Button} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import CF7Request from '@/fetches/cf7Request'
import endpoints from '@/utils/endpoints'
import {zodResolver} from '@hookform/resolvers/zod'
import {Loader2} from 'lucide-react'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'
import {z} from 'zod'

const formSchema = z.object({
  fullname: z.string().min(1, {
    message: 'Vui lòng nhập tên của bạn',
  }),
  phoneNumber: z.string().min(1, {
    message: 'Vui lòng nhập số điện thoại',
  }),
  email: z.string().email({
    message: 'Vui lòng nhập email hợp lệ',
  }),
  care: z.string().optional(),
  url: z.string().optional(),
})

export default function FormImplementedBuilding() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      phoneNumber: '',
      email: '',
      care: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const request = new CF7Request(values)
      const response = await request.send(
        endpoints.implementedBuilding.contactForm,
      )

      if (response?.invalid_fields?.length === 0) {
        toast.success('Đăng ký thành công')
      } else {
        toast.error('Đăng ký thất bại')
      }
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to submit the form. Please try again.')
    } finally {
      form.reset()
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-[1.25rem]'
      >
        <FormField
          control={form.control}
          name='fullname'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-white text-[0.875rem] font-semibold leading-[0.875rem] tracking-[0.00875rem]'>
                Tên của bạn{' '}
                <LabelRequiredIcon className='inline-block size-[0.4375rem]' />
              </FormLabel>
              <FormControl>
                <Input
                  className='p-[0.75rem] focus-visible:ring-0 focus-visible:ring-offset-0 h-[2.875rem] rounded-[0.5rem] bg-[#101A49] border-[0.8px] border-white/60 placeholder:text-[#B4B4B4] placeholder:text-[0.875rem] placeholder:leading-[1.375rem] text-white text-[0.875rem] leading-[1.375rem]'
                  placeholder='Vui lòng nhập tên của bạn'
                  type='text'
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phoneNumber'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-white text-[0.875rem] font-semibold leading-[0.875rem] tracking-[0.00875rem]'>
                Số điện thoại liên hệ{' '}
                <LabelRequiredIcon className='inline-block size-[0.4375rem]' />
              </FormLabel>
              <FormControl>
                <Input
                  className='p-[0.75rem] focus-visible:ring-0 focus-visible:ring-offset-0 h-[2.875rem] rounded-[0.5rem] bg-[#101A49] border-[0.8px] border-white/60 placeholder:text-[#B4B4B4] placeholder:text-[0.875rem] placeholder:leading-[1.375rem] text-white text-[0.875rem] leading-[1.375rem]'
                  placeholder='Vui lòng nhập số điện thoại'
                  type='text'
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-white text-[0.875rem] font-semibold leading-[0.875rem] tracking-[0.00875rem]'>
                Email{' '}
                <LabelRequiredIcon className='inline-block size-[0.4375rem]' />
              </FormLabel>
              <FormControl>
                <Input
                  className='p-[0.75rem] focus-visible:ring-0 focus-visible:ring-offset-0 h-[2.875rem] rounded-[0.5rem] bg-[#101A49] border-[0.8px] border-white/60 placeholder:text-[#B4B4B4] placeholder:text-[0.875rem] placeholder:leading-[1.375rem] text-white text-[0.875rem] leading-[1.375rem]'
                  placeholder='Vui lòng nhập email'
                  type='email'
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='care'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-white text-[0.875rem] font-semibold leading-[0.875rem] tracking-[0.00875rem]'>
                Căn hộ mà bạn quan tâm
              </FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  className='p-[0.75rem] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[0.5rem] bg-[#101A49] border-[0.8px] border-white/60 placeholder:text-[#B4B4B4] placeholder:text-[0.875rem] placeholder:leading-[1.375rem] text-white text-[0.875rem] leading-[1.375rem] resize-none h-[5.75rem]'
                  placeholder='Thông tin căn hộ mà bạn quan tâm'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant={'primary'}
          type='submit'
          className='w-full h-[2.75rem] text-[#000117] text-[0.875rem] font-semibold leading-[0.875rem] tracking-[0.00875rem] uppercase'
          disabled={isLoading}
        >
          <span className='relative z-[1] flex  items-center justify-center'>
            {isLoading ? 'Đang gửi...' : 'ĐĂNG KÝ NHẬN THÔNG TIN'}
            {isLoading ? (
              <Loader2 className='size-4 ml-2 animate-spin' />
            ) : (
              <ArrowRightIcon className='size-4 ml-2' />
            )}
          </span>
        </Button>
      </form>
    </Form>
  )
}

const LabelRequiredIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='7'
      height='7'
      viewBox='0 0 7 7'
      fill='none'
      className={className}
    >
      <path
        d='M0.429825 1.80923L2.84503 2.71385L2.78363 0H4.17544L4.11403 2.71385L6.57018 1.80923L7 3.20923L4.50292 3.98462L6.07895 6.13846L4.95322 7L3.45906 4.71692L1.98538 6.95692L0.859649 6.09538L2.4152 3.96308L0 3.18769L0.429825 1.80923Z'
        fill='#E64533'
      />
    </svg>
  )
}
