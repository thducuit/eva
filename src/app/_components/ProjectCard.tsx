'use client'

import { ContactButton } from '@/components/ContactButton'
import ImageFallback from '@/components/image/ImageFallback'
import { ROUTES } from '@/constants/routes'
import { ProjectAcfType } from '@/types/projects.interface'
import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface ProjectCardProps extends ProjectAcfType {
  slug: string
  type?: string
}

const ProjectCard = ({slug, title, images, type}: ProjectCardProps) => {
  return (
    <div className='w-full h-full relative'>
      <Swiper
        loop={true}
        effect='slide'
        speed={700}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: '.pagination-project-swiper',
          renderBullet: function (index, className) {
            return `<span class="custom-pagination-bullet ${className}"></span>`
          },
        }}
        className='project-item-swiper relative rounded-[0.75rem] group/card w-full h-full'
      >
        {/* <Image
          src={'/homepage/d-card-deco.svg'}
          alt='d-card-deco'
          width={64}
          height={30}
          className='w-[4rem] h-[1.875rem] object-cover absolute top-[1.25rem] left-[1.25rem] z-[2]'
        /> */}
        <h2 className='text-[1.25rem] font-semibold leading-[1.625rem] text-white absolute top-[1.25rem] right-[1.25rem] z-[2]'>
          {title}
        </h2>
        <div
          className='w-full h-[7.9375rem] xsm:top-[-1.25rem] absolute top-0 left-0 opacity-50 backdrop-blur-[3px] z-[1] lg:group-hover/card:opacity-100 transition-all duration-500 xsm:opacity-100'
          style={{
            background:
              'linear-gradient(180deg, #031F52 0%, rgba(3, 31, 82, 0.30) 48.86%, rgba(3, 31, 82, 0.00) 100%)',
          }}
        />
        <Link
          className='block w-full h-full absolute top-0 left-0 z-1'
          href={type === 'apartment' ? `${ROUTES.APARTMENT}/${slug}` : `${ROUTES.PROJECT}/${slug}`}
        ></Link>
        <div className='absolute bottom-[-10.5rem] left-1/2 -translate-x-1/2 transition-all duration-500 z-[2] lg:group-hover/card:opacity-100 opacity-0 lg:group-hover/card:bottom-[1.5rem] xsm:bottom-[1.1275rem] xsm:opacity-100'>
          <ContactButton contact={{url: ROUTES.CONTACT_FOR_CONSULTATION}} />
        </div>

        <div
          className='w-full h-[5.75rem] absolute bottom-[-10rem] lg:group-hover/card:bottom-0 left-0 z-[1] opacity-0 lg:group-hover/card:opacity-50 transition-all duration-500'
          style={{
            background:
              'linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.56) 60.77%, rgba(0, 0, 0, 0.00) 100%)',
          }}
        />

        <div className='size-[9rem] bg-[#0D1F41] absolute top-[-4.5rem] left-[-1.25rem] z-[1] opacity-0 xsm:opacity-100 lg:group-hover/card:opacity-100 transition-all duration-500 blur-[50px] rounded-full' />

        {Array.isArray(images) &&
          images.map((image, index) => (
            <SwiperSlide
              key={index}
              className='rounded-[0.75rem] overflow-hidden bg-white'
            >
              <ImageFallback
                src={image.url}
                alt={`${image.alt} ${index + 1}`}
                width={450}
                height={535}
                className='w-full h-full object-cover bg-white'
              />
            </SwiperSlide>
          ))}

        <div className='pagination-project-swiper'></div>
      </Swiper>
    </div>
  )
}

export default ProjectCard
