/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import WishlistCard from './WishlistCard'
import {convertRemToPx} from '@/lib/utils'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {Navigation, Pagination} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import ProjectNavigation from '@/app/_components/ProjectNavigation'
// import {PROJECTS_DATA} from '@/constants/projects'
import {useEffect, useState} from 'react'
import fetchData from '@/fetches/fetchData'
import endpoints from '@/utils/endpoints'
import {useSession} from 'next-auth/react'
import {Skeleton} from '@/components/ui/skeleton'

export default function WishlistGridPC() {
  const [wishlist, setWishlist] = useState<any[]>([])
  const {data: session} = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleRemoveFromWishlist = (
    apartmentId: string,
    styleId: string,
    index: number,
  ) => {
    setWishlist((prev) =>
      prev.filter(
        (item) =>
          !(
            item.apartment_id === apartmentId &&
            item.style_id === styleId &&
            item.index === index
          ),
      ),
    )
  }

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!session?.accessToken) return
      try {
        setIsLoading(true)
        const res = await fetchData({
          api: endpoints.favorite.api,
          method: 'GET',
          option: {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.accessToken}`,
            },
          },
        })
        // Convert object to array if needed
        const wishlistArray = Array.isArray(res) ? res : Object.values(res)
        setWishlist(wishlistArray)
      } catch (error) {
        console.log('🚀 ~ fetchWishlist ~ error:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchWishlist()
  }, [session])

  return (
    <>
      <Swiper
        slidesPerView={3}
        slidesPerGroup={3}
        spaceBetween={convertRemToPx(0.25)}
        effect='slide'
        speed={700}
        navigation={{
          nextEl: '.next-project-swiper',
          prevEl: '.prev-project-swiper',
        }}
        modules={[Navigation, Pagination]}
        pagination={{
          clickable: true,
          el: '.project-list-pagination',
          renderBullet: function (index, className) {
            return `<span class="custom-pagination-bullet ${className}"></span>`
          },
        }}
        className='project-swiper relative !w-full [&_.pagination-project-swiper]:!bottom-[1rem] xsm:!px-4'
      >
        {Array.isArray(wishlist) &&
          !isLoading &&
          wishlist?.map((project, index) => (
            <SwiperSlide
              key={index}
              className='xsm:!w-[17.5rem]'
            >
              <WishlistCard
                index={index}
                title={project.color_set_name}
                images={project.galleries}
                imageAlt={project.color_set_name}
                projectData={project}
                onRemoveFromWishlist={handleRemoveFromWishlist}
              />
            </SwiperSlide>
          ))}

        {isLoading &&
          Array.from({length: 3}).map((_, index) => (
            <SwiperSlide key={index}>
              <Skeleton className='w-[17.5rem] h-[21.9375rem]' />
            </SwiperSlide>
          ))}

        {!isLoading && wishlist.length === 0 && (
          <div className='w-full h-full flex items-center justify-center'>
            <p className='text-[#EFEFEF] font-medium leading-[1.125rem] tracking-[0.00875rem] text-[0.875rem]'>
              Không có dự án yêu thích
            </p>
          </div>
        )}
      </Swiper>
      <ProjectNavigation className='w-[59.7rem]' />
    </>
  )
}
