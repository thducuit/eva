import Image from 'next/image'

import {IImplementedBuilding} from '@/types/implemented.interface'
import FormImplementedBuilding from '@/app/(main)/du-an/[slug]/_components/form'

const ImplementedBuilding = async ({
  title,
  subtitle,
  desc,
  background_image,
}: IImplementedBuilding) => {
  return (
    <section className='w-full h-[71.3125rem] relative xsm:h-[85.3125rem]'>
      <Image
        src={background_image?.url || '/toa-chua-trien-khai/d-bg.webp'}
        alt={background_image?.alt || ''}
        width={1600}
        height={1140}
        className='w-full h-[71.3125rem] xsm:h-[85.3125rem] object-cover'
      />

      <div
        className='h-[38.5rem] xsm:h-full w-full absolute bottom-0 left-0 xsm:inset-0'
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 1, 23, 0.00) 6.62%, #000117 100%)',
        }}
      />

      <div
        className='w-full h-[62.0625rem] absolute top-0 left-0 opacity-65 xsm:opacity-80'
        style={{
          background:
            'linear-gradient(0deg, rgba(0, 1, 23, 0.00) 0%, rgba(0, 1, 23, 0.60) 40.37%, #000117 100%)',
        }}
      />

      <div
        className='absolute inset-0 opacity-65'
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 1, 23, 0.00) 0%, #000117 100%)',
        }}
      />

      <div className='w-[86.125rem] xsm:top-[5.875rem] xsm:left-0 xsm:px-[1rem] xsm:translate-x-0 xsm:w-full overflow-hidden left-1/2 -translate-x-1/2 flex xsm:flex-col mx-auto top-[12.3685rem] absolute z-[1] space-x-[2.5rem] xsm:space-y-[2.5rem]'>
        <article className='w-[46.4375rem] xsm:w-full'>
          <h1 className='text-[#F6E280] text-[2rem] font-semibold leading-[2.375rem] tracking-[0.005rem] uppercase xsm:text-[1.5rem] xsm:leading-[1.875rem]'>
            {title}
          </h1>
          <h3 className='text-[1.5rem] xsm:text-[1.25rem] xsm:leading-[1.625rem] text-white font-semibold leading-[1.875rem] mt-[0.75rem]'>
            {subtitle}
          </h3>

          <article
            className='[&_p]:max-w-[36.375rem] [&_p]:my-[1rem] [&_ul]:max-w-[31.6875rem] text-[#efefef] text-[0.875rem] leading-[1.25rem] font-medium tracking-[0.00875rem] [&_ul]:list-disc [&_ul]:list-inside [&_ul]:ml-[0.5rem] xsm:[&_p]:w-full xsm:[&_ul]:w-full'
            dangerouslySetInnerHTML={{
              __html: desc,
            }}
          ></article>
        </article>

        <div className='flex-1 w-[37.1875rem] p-[2rem] xsm:w-full xsm:p-[1rem] rounded-[0.75rem] bg-[#121030]/85 backdrop-blur-[3px]'>
          <h2 className='text-white text-[1.5rem] xsm:text-[1.125rem] xsm:leading-[1.625rem] font-semibold tracking-[0.015rem] mb-[1.875rem]'>
            Đăng ký nhận thông tin về dự án
          </h2>

          <FormImplementedBuilding />
        </div>
      </div>
    </section>
  )
}

export default ImplementedBuilding
