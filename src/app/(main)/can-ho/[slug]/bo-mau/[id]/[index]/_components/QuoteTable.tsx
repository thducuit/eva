'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {IReplacementProduct} from '@/types/colorSet.interface'
import Image from 'next/image'
import {formatVND} from './PriceSummary'
import {Loader2Icon} from 'lucide-react'

interface QuoteTableProps {
  products: IReplacementProduct[]
  isLoading: boolean
}

const QuoteTable = ({products, isLoading}: QuoteTableProps) => {
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[32.565rem]'>
        <Loader2Icon className='size-10 animate-spin text-white' />
      </div>
    )
  }

  return (
    <Table className='w-[87.375rem] ml-[-0.625rem] xsm:ml-[-0.125rem]'>
      <TableHeader className='bg-[#101a49] h-[3.875rem] sticky top-0'>
        <TableRow>
          <TableHead className='border-r-[0.8px] border-white/50 text-center w-[3.75rem] text-white text-base font-semibold leading-[1.375rem] tracking-[0.0125rem]'>
            STT
          </TableHead>
          <TableHead className='border-r-[0.8px] border-white/50 text-center w-[9.5625rem] text-white text-base font-semibold leading-[1.375rem] tracking-[0.0125rem]'>
            Hình ảnh
          </TableHead>
          <TableHead className='border-r-[0.8px] border-white/50 text-center w-[20.9375rem] text-white text-base font-semibold leading-[1.375rem] tracking-[0.0125rem]'>
            Tên sản phẩm
          </TableHead>
          <TableHead className='border-r-[0.8px] border-white/50 text-center w-[9rem] text-white text-base font-semibold leading-[1.375rem] tracking-[0.0125rem]'>
            Số lượng (Cái)
          </TableHead>
          <TableHead className='border-r-[0.8px] border-white/50 text-center w-[16.1275rem] text-white text-base font-semibold leading-[1.375rem] tracking-[0.0125rem]'>
            Đơn giá/Giá chênh lệch (VND)
          </TableHead>
          <TableHead className='border-r-[0.8px] border-white/50 text-center w-[15.75rem] text-white text-base font-semibold leading-[1.375rem] tracking-[0.0125rem]'>
            Thành tiền (Chưa VAT) (VND)
          </TableHead>
          <TableHead className='text-center  text-white text-base font-semibold leading-[1.375rem] tracking-[0.0125rem]'>
            Không gian
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(products) &&
          products?.map((product: IReplacementProduct, index: number) => (
            <TableRow
              className='h-[6.625rem]'
              key={index}
            >
              <TableCell className='text-white text-base leading-[1.5rem] tracking-[0.0025rem] text-center border-r-[0.8px] border-white/50'>
                {index + 1}
              </TableCell>
              <TableCell className='flex items-center justify-center border-r-[0.8px] border-white/50'>
                <Image
                  src={product?.image}
                  alt={`${product?.name} - ${product?.spaces}`}
                  width={120}
                  height={85}
                  className='w-[7.5rem] h-[5.20588rem] object-contain bg-white rounded-[0.26469rem]'
                />
              </TableCell>
              <TableCell className='text-white text-base leading-[1.5rem] tracking-[0.0025rem] text-center uppercase border-r-[0.8px] border-white/50'>
                {product?.name}
              </TableCell>
              <TableCell className='text-white text-base leading-[1.5rem] tracking-[0.0025rem] text-center uppercase border-r-[0.8px] border-white/50'>
                {product?.quantity}
              </TableCell>
              <TableCell className='text-[#F6E280] text-base font-bold leading-[1.375rem] tracking-[0.0125rem] text-center uppercase border-r-[0.8px] border-white/50'>
                {/* {formatVND(Number(product?.price))} */}
                {/* {product.product_type === 'replacement'
                  ? formatVND(Number(product?.line_difference))
                  : formatVND(Number(product?.price))} */}
              </TableCell>
              <TableCell className='text-[#F6E280] text-base font-bold leading-[1.375rem] tracking-[0.0125rem] text-center uppercase border-r-[0.8px] border-white/50'>
                {/* {formatVND(product.line_difference)} */}
              </TableCell>
              <TableCell className='text-white text-base leading-[1.5rem] tracking-[0.0025rem] text-center'>
                {product?.spaces}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default QuoteTable
