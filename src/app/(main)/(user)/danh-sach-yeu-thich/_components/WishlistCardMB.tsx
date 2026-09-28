/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import ICHeart from '@/components/icon/ICRequired copy'
import {useSession} from 'next-auth/react'
import fetchData from '@/fetches/fetchData'
import endpoints from '@/utils/endpoints'
import {useState} from 'react'
import {toast} from 'sonner'
import {useRouter} from 'next/navigation'
import {ROUTES} from '@/constants/routes'
import Link from 'next/link'

interface WishlistCardMBProps {
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

const WishlistCardMB = ({
  title,
  images,
  imageAlt,
  index,
  projectData,
  onRemoveFromWishlist,
}: WishlistCardMBProps) => {
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
    <div className='w-full shrink-0 h-full relative rounded-[0.375rem]'>
      <Link
        href={`${ROUTES.APARTMENT}/${projectData.apartment_slug}/bo-mau/${projectData.style_slug}/${projectData.index}`}
      >
        <div className='relative group/card w-full h-full rounded-[0.375rem]'>
          <div className='absolute top-0 left-0 h-[11.5625rem] z-10 w-full opacity-90 rounded-[0.375rem]'>
            <div className='size-full absolute top-0 left-0 bg-[linear-gradient(0deg,rgba(1,2,23,0.00)_30%,#010217_100%)] transition-all duration-200 lg:group-hover/card:opacity-0 rounded-[0.375rem]'></div>
            <div className='size-full absolute top-0 left-0 bg-[linear-gradient(0deg,rgba(19,24,116,0.00)_0%,#131874_100%)] transition-all duration-200 opacity-0 lg:group-hover/card:opacity-100 rounded-[0.375rem]'></div>
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
          {Array.isArray(images) && images?.[0] && (
            <Image
              src={images?.[0].url || images?.[0]}
              alt={imageAlt}
              width={450}
              height={535}
              className='w-full h-full object-cover rounded-[0.375rem]'
            />
          )}
          <div className='pagination-project-swiper'></div>
        </div>
      </Link>
    </div>
  )
}

export default WishlistCardMB
