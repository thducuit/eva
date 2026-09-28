'use client'

import ProjectCard from '@/app/_components/ProjectCard'
import useIsMobile from '@/hooks/useIsMobile'
import {convertRemToPx} from '@/lib/utils'
import {ProjectDataResType} from '@/types/projects.interface'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {Navigation, Pagination} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'

type ProjectSlideProps = {
  projects: ProjectDataResType
}

const ProjectSlide = ({projects}: ProjectSlideProps) => {
  const isMobile = useIsMobile()
  return (
    <Swiper
      slidesPerView={isMobile ? 1 : 3}
      slidesPerGroup={isMobile ? 1 : 3}
      spaceBetween={convertRemToPx(1.4375)}
      effect='slide'
      speed={700}
      navigation={{
        nextEl: '.next-project-swiper',
        prevEl: '.prev-project-swiper',
      }}
      modules={[Navigation, Pagination]}
      grabCursor={true}
      // allowTouchMove={false}
      pagination={{
        clickable: true,
        el: '.project-list-pagination',
        renderBullet: function (index, className) {
          return `<span class="custom-pagination-bullet ${className}"></span>`
        },
      }}
      className='project-swiper relative w-[87.4375rem] xsm:w-full xsm:px-[1.25rem]!'
    >
      {Array.isArray(projects) &&
        projects.map((project, index) => (
          <SwiperSlide
            key={index}
            className='w-[28.1875rem]! xsm:w-full! xsm:h-[29.75rem]! h-[33.375rem]! relative'
          >
            <ProjectCard
              slug={project.slug}
              title={project.name}
              images={project.acf?.images}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default ProjectSlide
