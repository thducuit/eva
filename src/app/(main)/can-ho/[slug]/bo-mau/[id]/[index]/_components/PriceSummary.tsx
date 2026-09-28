'use client'

import {Separator} from '@/components/ui/separator'
import {useSession} from 'next-auth/react'

export const formatVND = (value: number) =>
  `${new Intl.NumberFormat('en-US', {}).format(value || 0)} VND`

const PriceSummary = ({
  priceDifference,
  priceBuyMore,
}: {
  priceDifference: number
  priceBuyMore: number
}) => {
  const {data: session} = useSession()
  if (!session?.accessToken)
    return (
      <p className='text-[#efefef] text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00875rem] mt-[1.375rem] pb-[1.375rem]'>
        Vui lòng đăng nhập để xem tổng giá
      </p>
    )

  return (
    <div className='flex items-center mt-[1.375rem] xsm:mt-0 xsm:flex-col'>
      <article className='w-[8.25rem] space-y-[0.5rem] xsm:w-full xsm:border-b xsm:pb-[0.75rem] xsm:border-[#D9D9D9]/30'>
        <p className='text-[#efefef] text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00875rem] opacity-70'>
          Tổng giá chênh lệch sau khi thay:
        </p>
        <p className='text-[#efefef] text-base font-semibold leading-[1.375rem] tracking-[0.0125rem]'>
          {/* {formatVND(priceDifference)} */}
        </p>
      </article>
      <Separator
        orientation='vertical'
        className='h-[4.375rem]! border-[0.0625rem]! border-[#D9D9D9] rounded-[0.3125rem] opacity-30 mx-[0.85rem] xsm:hidden'
      />
      <article className='w-[8.25rem] space-y-[0.5rem] xsm:w-full xsm:border-b xsm:pb-[0.75rem] xsm:border-[#D9D9D9]/30 xsm:mt-[0.75rem]'>
        <p className='text-[#efefef] text-[0.875rem] xsm:w-full font-medium leading-[1.25rem] tracking-[0.00875rem] opacity-70 w-[4.375rem]'>
          Tổng giá mua thêm:
        </p>
        <p className='text-[#efefef] text-base font-semibold leading-[1.375rem] tracking-[0.0125rem]'>
          {/* {formatVND(priceBuyMore)} */}
        </p>
      </article>
      <Separator
        orientation='vertical'
        className='h-[4.375rem]! border-[0.0625rem]! border-[#D9D9D9] rounded-[0.3125rem] opacity-30 mx-[0.85rem] xsm:hidden'
      />
      <article className='w-[8.25rem] space-y-[0.5rem] xsm:w-full xsm:mt-[0.75rem] xsm:pb-[1rem]'>
        <p className='text-[#efefef] text-[0.875rem] font-medium leading-[1.25rem] xsm:w-full tracking-[0.00875rem] opacity-70 w-[4.375rem]'>
          Tổng giá phát sinh:
        </p>
        <p className='text-[#F6E280] text-base font-semibold leading-[1.375rem] tracking-[0.0125rem]'>
          {/* {formatVND(priceDifference + priceBuyMore)} */}
        </p>
      </article>
    </div>
  )
}

export default PriceSummary
