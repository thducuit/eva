'use client'

import Image from 'next/image'
import {NavigationSwiperIcon} from '@/components/icon'
import {Autoplay, Navigation, Pagination, Parallax} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'

import 'swiper/css'
import 'swiper/css/parallax'
import {IMedia} from '@/types/media.interface'

export type SwiperImage = {src: string; alt: string}

interface ApartmentSwiperProps {
  images: IMedia[]
}

const ApartmentSwiper = ({images}: ApartmentSwiperProps) => {
  return (
    <div className='relative'>
      <Swiper
        modules={[Parallax, Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        speed={1500}
        loop={true}
        parallax={true}
        className='w-[57.8125rem] h-[34.875rem] rounded-[0.375rem] xsm:w-[20.9375rem] xsm:h-[12.625rem]'
        grabCursor={true}
        pagination={{
          clickable: true,
          el: '.apartment-pagination',
          renderBullet: function (index, className) {
            return `<span class="custom-pagination-bullet ${className}"></span>`
          },
        }}
        navigation={{
          nextEl: '.next-apartment-swiper',
          prevEl: '.prev-apartment-swiper',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className='relative overflow-hidden'
          >
            <div
              className='size-full overflow-hidden absolute top-0 left-0 will-change-transform bg-white'
              data-swiper-parallax='70%'
            >
              {/* Blurred background image */}
              <Image
                width={1920}
                height={1080}
                src={image.url}
                alt={image.alt}
                className='w-full h-full object-cover will-change-transform blur-sm scale-110'
              />
              {/* Main image */}
              <Image
                width={1920}
                height={1080}
                src={image.url}
                alt={image.alt}
                className='w-full h-full object-contain will-change-transform absolute top-0 left-0'
              />
            </div>
          </SwiperSlide>
        ))}

        <div className='apartment-pagination'></div>
      </Swiper>

      <div className='pointer-events-none apartment-navigation xsm:w-[110%] absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 flex items-center justify-between w-[55.3125rem] z-[2]'>
        <button className='pointer-events-auto prev-apartment-swiper size-[2rem] p-[0.48438rem_0.5625rem_0.42188rem_0.5625rem] rounded-[0.375rem] bg-[#dedede]/58 flex items-center justify-center cursor-pointer group hover:bg-[#F6E280] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'>
          <NavigationSwiperIcon className='w-[0.875rem] h-[1.09375rem] group-hover:text-[#000117]' />
        </button>

        <button className='pointer-events-auto next-apartment-swiper size-[2rem] p-[0.48438rem_0.5625rem_0.42188rem_0.5625rem] rounded-[0.375rem] bg-[#dedede]/58 flex items-center justify-center cursor-pointer group hover:bg-[#F6E280] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'>
          <NavigationSwiperIcon className='w-[0.875rem] h-[1.09375rem] rotate-180' />
        </button>
      </div>
    </div>
  )
}

export default ApartmentSwiper
