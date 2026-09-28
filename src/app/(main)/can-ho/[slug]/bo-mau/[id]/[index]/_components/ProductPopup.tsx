'use client'

import ImageFallback from '@/components/image/ImageFallback'
import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  IColorSet,
  IProduct,
  IReplacementProduct,
} from '@/types/colorSet.interface'
import {useState} from 'react'

const ProductPopup = ({
  product,
  space,
  quantity,
  productGroup,
}: {
  product: IProduct['product'] | IReplacementProduct
  space: string
  quantity: string
  showPrice?: boolean
  productGroup?: IColorSet['product_group_1'][0]
}) => {
  const [openPopup, setOpenPopup] = useState(false)

  const productWide = productGroup?.wide ? productGroup?.wide : product?.wide
  const productDeep = productGroup?.deep ? productGroup?.deep : product?.deep
  const productHigh = productGroup?.high ? productGroup?.high : product?.high

  return (
    <Sheet
      open={openPopup}
      onOpenChange={setOpenPopup}
    >
      <SheetTrigger asChild>
        <div className='absolute inset-0 z-[2]'></div>
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='h-[41.75rem] xsm:h-auto xsm:pb-[2rem] bg-[#000117]/90 border-none focus:outline-none focus:ring-0 ring-0 ring-offset-0 xsm:rounded-t-[0.375rem] xsm:border-[#dbdbdb]/30 xsm:overflow-hidden backdrop-blur-[2px] xsm:border-none'
        closeButton={false}
      >
        <div className='relative overflow-hidden w-full h-full'>
          <div className='w-[95.8125rem] h-[12.5rem] absolute left-1/2 -translate-x-1/2 top-[-8.125rem] rounded-full opacity-40 bg-[linear-gradient(180deg,_#A6762C_0%,_#F0D977_100%)] blur-[100px] z-[1] xsm:opacity-80 xsm:top-[-10.125rem] xsm:rounded-t-[0.375rem]' />
          <SheetHeader className='pt-[1.75rem] px-[6.25rem] relative pb-0 z-[2] mb-[2.6875rem] flex flex-row items-center justify-between xsm:items-start xsm:pt-[1.25rem] xsm:px-[1.25rem] xsm:mb-0'>
            <SheetTitle className='text-[1.25rem] text-[#EFEFEF] font-semibold leading-[1.625rem] uppercase'>
              Thông tin sản phẩm
            </SheetTitle>
            <button onClick={() => setOpenPopup(false)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                className='size-[1.125rem]'
              >
                <path
                  d='M18.9999 18.9999L10 10M10 10L1 1M10 10L19.0001 1M10 10L1 19.0001'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </SheetHeader>

          <div className='p-[2rem_2.5rem] max-w-[87.5rem] xsm:w-full mx-auto rounded-[0.25rem] border-[0.8px] border-white/50 h-[31.5rem] xsm:h-auto xsm:border-none xsm:p-[1.25rem]'>
            <div className='flex items-center justify-center space-x-[3.5rem]'>
              <ImageFallback
                src={product?.featured_image?.url}
                alt={product?.featured_image?.alt}
                width={620}
                height={435}
                className='w-[38.5rem] h-[27.0625rem] object-contain bg-white rounded-[0.25rem] xsm:hidden'
              />
              <article className='flex-1 xsm:w-full'>
                <p className='text-white text-[1.25rem] font-medium leading-[1.75rem] mb-[1rem]'>
                  {product?.name}
                </p>
                <div className='flex space-x-[1.5rem] text-[0.875rem] font-semibold leading-[0.875rem] tracking-[0.00875rem] xsm:flex-col xsm:space-x-0 xsm:space-y-[0.5rem]'>
                  <p className='text-[#ccc] w-[19.5rem] font-medium'>
                    Không gian:{' '}
                    <span className='text-white'>
                      {space ? space : 'Không có không gian'}
                    </span>
                  </p>
                  <p className='text-[#ccc] w-[19.5rem] font-medium'>
                    Kích thước:{' '}
                    <span className='text-white'>
                      {`${productWide ? `${productWide}` : ''}${
                        productDeep ? `x${productDeep}` : ''
                      }${productHigh ? `x${productHigh}` : ''}`}
                    </span>
                  </p>
                </div>
                <p className='text-[#ccc] text-[0.875rem] font-semibold leading-[0.875rem] tracking-[0.00875rem] w-[19.5rem]  mt-[0.5rem]'>
                  Số lượng:{' '}
                  <span className='text-white font-medium'>{quantity}</span>
                </p>

                {/* {showPrice && session?.accessToken && (
                  <p className='text-[1.5rem] leading-[1.875rem] font-semibold text-[#f6e280] mt-[1rem]'>
                    <span>{formatVND(Number(product?.price))}</span>
                  </p>
                )} */}

                <Separator className='w-full border-[0.0625rem] border-[#E4E7E94F] opacity-30 mt-[1rem]' />

                <p className='text-[#ccc] text-[0.875rem] font-semibold leading-[0.875rem] tracking-[0.00875rem] mt-[1.5rem]'>
                  Mô tả chi tiết:
                </p>
                <p className='text-white text-[0.875rem] leading-[1.375rem] tracking-[0.00219rem] mt-[0.5rem]'>
                  {product?.desc}
                </p>

                <div className='flex items-center justify-end'>
                  <Button
                    variant={'primary'}
                    className='mt-[3.5rem] w-[12.625rem] h-[2.75rem] text-[#000117] text-[0.875rem] font-semibold tracking-[0.00875rem] uppercase leading-[0.875rem]'
                    onClick={() => setOpenPopup(false)}
                  >
                    <span className='relative z-[1]'>Xác nhận</span>
                  </Button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ProductPopup
