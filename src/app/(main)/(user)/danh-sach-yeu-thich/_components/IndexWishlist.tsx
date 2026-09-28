/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import WishlistCardMB from '@/app/(main)/(user)/danh-sach-yeu-thich/_components/WishlistCardMB'
import {useLayoutEffect, useState, useEffect} from 'react'
import WishlistGridPC from './WishlistGridPC'
import {useSession} from 'next-auth/react'
import fetchData from '@/fetches/fetchData'
import endpoints from '@/utils/endpoints'
import {Skeleton} from '@/components/ui/skeleton'

export default function IndexWishlist() {
  const [isDesktop, setIsDesktop] = useState(false)
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

  useLayoutEffect(() => {
    setIsDesktop(window.innerWidth >= 640)
  }, [])

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
    <section className='rounded-[0.75rem] bg-[rgba(22,21,48,0.85)] backdrop-blur-[10px] p-10 relative xsm:p-[1.12rem_1px]'>
      <div className='w-full relative xsm:hidden'>
        {isDesktop && <WishlistGridPC />}
      </div>
      <div className='w-full relative sm:hidden flex overflow-x-auto xsm:px-4 gap-2 hidden_scroll'>
        {isLoading &&
          Array.from({length: 3}).map((_, index) => (
            <Skeleton
              key={index}
              className='w-[17.5rem] h-[21.9375rem] shrink-0'
            />
          ))}

        {!isLoading && wishlist.length === 0 && (
          <div className='w-full h-full flex items-center justify-center'>
            <p className='text-[#EFEFEF] font-medium leading-[1.125rem] tracking-[0.00875rem] text-[0.875rem]'>
              Không có dự án yêu thích
            </p>
          </div>
        )}

        {Array.isArray(wishlist) &&
          !isLoading &&
          wishlist?.map((project, index) => (
            <WishlistCardMB
              key={index}
              title={project.color_set_name}
              images={project.galleries}
              imageAlt={project.color_set_name}
              index={index}
              projectData={project}
              onRemoveFromWishlist={handleRemoveFromWishlist}
            />
          ))}
      </div>
    </section>
  )
}
