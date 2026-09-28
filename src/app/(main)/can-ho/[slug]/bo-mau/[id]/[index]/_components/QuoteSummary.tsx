import {formatVND} from './PriceSummary'

interface QuoteSummaryProps {
  totalAmount: number
  isLoading: boolean
}

const QuoteSummary = ({totalAmount, isLoading}: QuoteSummaryProps) => {
  if (isLoading) return null

  return (
    <div className='h-[5.6275rem] xsm:mt-[1.8675rem] xsm:h-auto w-[87.5rem] border-[0.8px] xsm:border-none border-white/50 mx-auto rounded-b-[0.625rem] border-t-0 flex items-center xsm:w-full xsm:block'>
      <div className='w-[59.3rem] h-full border-r-[0.8px] border-white/50 xsm:hidden' />
      <div className='w-[15.72rem] h-full flex items-center justify-center border-r-[0.8px] border-white/50 xsm:border-none xsm:h-auto xsm:w-full'>
        <p className='text-white text-base leading-[1.375rem] tracking-[0.0125rem] xsm:w-[20.9375rem] xsm:flex xsm:items-center xsm:justify-between'>
          Tổng giá:{' '}
          <span className='font-bold text-[#F6E280] xsm:block'>
            {/* {formatVND(Number(totalAmount))} */}
          </span>
        </p>
      </div>
      <div className='flex-1 xsm:hidden' />
    </div>
  )
}

export default QuoteSummary
