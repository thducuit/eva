'use client'

import {GoogleIcon, UserIcon} from '@/components/icon'
import {Button} from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import useIsMobile from '@/hooks/useIsMobile'
import {IReplacementProduct} from '@/types/colorSet.interface'
import {Loader2Icon} from 'lucide-react'
import {useState} from 'react'
import QuoteSummary from './QuoteSummary'
import QuoteTable from './QuoteTable'
import {useSession} from 'next-auth/react'
import {IColorSet} from '@/types/colorSet.interface'

interface QuoteDownloadSheetProps {
  onGetData: () => void
  onDownload: () => void
  data:
    | {
        products: IReplacementProduct[]
        quote_info: {total_amount: number; total_difference: number}
      }
    | undefined
  openPopupDownload: boolean
  setOpenPopupDownload: (open: boolean) => void
  isLoading: boolean
  colorSetData: IColorSet
  isDownloading: boolean
}

const QuoteDownloadSheet = ({
  openPopupDownload,
  setOpenPopupDownload,
  onGetData,
  onDownload,
  data,
  isLoading,
  isDownloading,
}: QuoteDownloadSheetProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useIsMobile()

  const {data: session} = useSession()

  return (
    <Sheet
      open={openPopupDownload && !!session?.accessToken}
      onOpenChange={setOpenPopupDownload}
    >
      <SheetTrigger asChild>
        <Button
          variant={'tertiary'}
          text={'default'}
          className='flex-center text-white h-[2.75rem] w-[9.5625rem] uppercase xsm:w-[9.9375rem]'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onGetData}
        >
          <div className='relative'>
            <div
              className={`transition-opacity duration-500 ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {isMobile ? (
                <UserIcon className='size-4 xsm:size-[0.875rem]' />
              ) : (
                <GoogleIcon className='size-4' />
              )}
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <UserIcon className='size-4' />
            </div>
          </div>
          <span>Tải báo giá</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='pb-[1.9375rem] xsm:pb-0 bg-[#000117]/90 border-none focus:outline-none focus:ring-0 ring-0 ring-offset-0 xsm:h-auto xsm:rounded-t-[0.375rem] xsm:border-[#dbdbdb]/30 xsm:overflow-hidden'
        closeButton={false}
      >
        <div className='relative overflow-hidden w-full h-full'>
          <div className='w-[95.8125rem] h-[12.5rem] absolute left-1/2 -translate-x-1/2 top-[-8.125rem] rounded-full opacity-40 bg-[linear-gradient(180deg,_#A6762C_0%,_#F0D977_100%)] blur-[100px] z-[1] xsm:opacity-80 xsm:top-[-10.125rem] xsm:rounded-t-[0.375rem]' />
          <SheetHeader className='pt-[1.75rem] px-[6.25rem] relative pb-0 z-[2] mb-[2.6875rem] flex flex-row items-center justify-between xsm:items-start xsm:pt-[1.25rem] xsm:px-[1.25rem] xsm:mb-[1.25rem]'>
            <SheetTitle className='text-[1.25rem] text-[#EFEFEF] font-semibold leading-[1.625rem] uppercase'>
              Bảng báo giá sản phẩm
            </SheetTitle>
            <button onClick={() => setOpenPopupDownload(false)}>
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
          <div className='rounded-t-[0.625rem] xsm:rounded-b-[0.625rem] xsm:border-b-[0.8px] xsm:border-white/50 custom-scrollbar max-h-[26.9375rem] w-[87.5rem] border-white/50 border-[0.8px] mx-auto relative z-[5] overflow-y-auto xsm:mx-[1.25rem] xsm:w-[20.9375rem] xsm:max-h-[21.8125rem]'>
            <QuoteTable
              products={data?.products || []}
              isLoading={isLoading}
            />
          </div>
          <QuoteSummary
            totalAmount={data?.quote_info?.total_difference || 0}
            isLoading={isLoading}
          />
          <div className='flex items-center justify-end mt-[1.6875rem] mr-[6.25rem] xsm:mt-[1.75rem] xsm:mr-0 xsm:p-[1.25rem] xsm:border-t xsm:border-[#dbdbdb]/30'>
            <Button
              variant={'primary'}
              text='default'
              className='w-[12.625rem] xsm:w-full h-[2.75rem] hover:text-[#000117] uppercase'
              onClick={onDownload}
              disabled={isDownloading}
            >
              <span className='relative z-[1] flex items-center'>
                {isDownloading ? 'Đang tải...' : 'Xác nhận tải báo giá'}
                {isDownloading && (
                  <Loader2Icon className='size-4 ml-2 animate-spin' />
                )}
              </span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default QuoteDownloadSheet
