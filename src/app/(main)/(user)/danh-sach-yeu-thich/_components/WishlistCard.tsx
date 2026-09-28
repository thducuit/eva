/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import ICHeart from '@/components/icon/ICRequired copy'
import {useSession} from 'next-auth/react'
import fetchData from '@/fetches/fetchData'
import endpoints from '@/utils/endpoints'
import {useState} from 'react'
import {toast} from 'sonner'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {ROUTES} from '@/constants/routes'

interface WishlistCardProps {
  title: string
  images: any[]
  imageAlt: string
  index: number
  projectData: any
  onRemoveFromWishlist?: (
    apartmentId: string,
    styleId: string,
    index: number,
  ) => void
}

const WishlistCard = ({
  title,
  images,
  imageAlt,
  index,
  projectData,
  onRemoveFromWishlist,
}: WishlistCardProps) => {
  const {data: session} = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const removeWishlist = async () => {
    if (!session?.accessToken) return
    setIsLoading(true)
    try {
      await fetchData({
        api: endpoints.favorite.api,
        method: 'DELETE',
        option: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            apartment_id: projectData.apartment_id,
            style_id: projectData.style_id,
            index: projectData.index,
          }),
        },
      })
      toast.success('Xóa khỏi danh sách yêu thích thành công')

      // Cập nhật UI ngay lập tức nếu có callback
      if (onRemoveFromWishlist) {
        onRemoveFromWishlist(
          projectData.apartment_id,
          projectData.style_id,
          projectData.index,
        )
      } else {
        // Fallback: refresh trang nếu không có callback
        router.refresh()
      }
    } catch (error) {
      toast.error('Xóa khỏi danh sách yêu thích thất bại')
      console.log('🚀 ~ removeWishlist ~ error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full h-full relative'>
      <Link
        href={`${ROUTES.APARTMENT}/${projectData.apartment_slug}/bo-mau/${projectData.style_slug}/${projectData.index}`}
      >
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
          className='project-item-swiper relative group/card w-full h-full'
        >
          <div className='absolute top-0 left-0 h-[11.5625rem] z-10 w-full opacity-90'>
            <div className='size-full absolute top-0 left-0 bg-[linear-gradient(0deg,rgba(1,2,23,0.00)_30%,#010217_100%)] transition-all duration-200 lg:group-hover/card:opacity-0'></div>
            <div className='size-full absolute top-0 left-0 bg-[linear-gradient(0deg,rgba(19,24,116,0.00)_0%,#131874_100%)] transition-all duration-200 opacity-0 lg:group-hover/card:opacity-100'></div>
          </div>
          <div className='absolute top-0 left-0 w-full z-10 flex text-[1.125rem] font-semibold leading-[1.44] p-4 text-white'>
            <span>0{index + 1}</span>
            <span className='pl-3 inline-block w-[12.875rem]'>{title}</span>
            <button
              className='top-4 right-4 absolute hover:scale-110 transition-all duration-500'
              onClick={removeWishlist}
              disabled={isLoading}
            >
              <ICHeart className='size-[1.25rem]' />
            </button>
          </div>
          {Array.isArray(images) &&
            images.map((image, index) => (
              <>
                <SwiperSlide
                  key={index}
                  className='w-[20.4775rem] h-[21.9375rem] overflow-hidden'
                >
                  <Image
                    src={image.url}
                    alt={imageAlt}
                    width={450}
                    height={535}
                    className='w-[20.4775rem] h-[21.9375rem] object-cover'
                  />
                </SwiperSlide>
              </>
            ))}

          <div className='pagination-project-swiper'></div>
        </Swiper>
      </Link>
    </div>
  )
}

export default WishlistCard
