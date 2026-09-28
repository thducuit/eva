/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {Button} from '@/components/ui/button'
import fetchData from '@/fetches/fetchData'
import {IColorSet} from '@/types/colorSet.interface'
import endpoints from '@/utils/endpoints'
import {useSession} from 'next-auth/react'
import {useEffect, useState} from 'react'
import {toast} from 'sonner'

interface FavoriteButtonProps {
  colorSetData: IColorSet
}

const FavoriteButton = ({colorSetData}: FavoriteButtonProps) => {
  const {data: session} = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const addFavorite = async () => {
    if (!session?.accessToken) {
      toast.error('Vui lòng đăng nhập để thêm vào danh sách yêu thích')
      return
    }
    try {
      setIsLoading(true)
      const res = await fetchData({
        api: endpoints.favorite.api,
        method: 'POST',
        option: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            apartment_id: colorSetData.apartment_id,
            style_id: colorSetData.style_id,
            index: colorSetData.index,
          }),
        },
      })

      if (res?.data?.status && res?.data?.status === 401) {
        toast.error('Vui lòng đăng nhập để thêm vào danh sách yêu thích')
        setIsFavorite(false)
      } else {
        toast.success('Thêm vào danh sách yêu thích thành công!')
        setIsFavorite(true)
      }
    } catch (error) {
      console.log('🚀 ~ addFavorite ~ error:', error)
      toast.error('Thêm vào danh sách yêu thích thất bại!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClick = () => {
    addFavorite()
  }

  const [wishlist, setWishlist] = useState<any[]>([])

  useEffect(() => {
    const fetchWishlist = async () => {
      if (session?.accessToken) {
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
        const wishlistArray = Array.isArray(res) ? res : Object.values(res)
        setWishlist(wishlistArray)
      }
    }
    fetchWishlist()
  }, [session])

  useEffect(() => {
    if (!session?.accessToken) return
    setIsFavorite(
      Array.isArray(wishlist) &&
        wishlist?.length > 0 &&
        wishlist?.some(
          (item: any) =>
            item.apartment_id === colorSetData.apartment_id &&
            item.style_id === colorSetData.style_id &&
            item.index == colorSetData.index,
        ),
    )
  }, [wishlist, colorSetData, session?.accessToken])

  const removeFavorite = async () => {
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
            apartment_id: colorSetData.apartment_id,
            style_id: colorSetData.style_id,
            index: colorSetData.index,
          }),
        },
      })
      toast.success('Xóa khỏi danh sách yêu thích thành công')
    } catch (error) {
      console.log('🚀 ~ removeFavorite ~ error:', error)
      toast.error('Xóa khỏi danh sách yêu thích thất bại')
    } finally {
      setIsLoading(false)
      setIsFavorite(false)
    }
  }

  return (
    <Button
      variant={'tertiary'}
      text={'default'}
      className='flex-center text-white h-[2.75rem] w-[18.5625rem] uppercase xsm:w-[9.9375rem]'
      onClick={() => {
        if (isFavorite) {
          removeFavorite()
        } else {
          handleClick()
        }
      }}
      disabled={isLoading}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 16 16'
        className='size-4'
      >
        <path
          d='M8.41398 13.8731C8.18732 13.9531 7.81398 13.9531 7.58732 13.8731C5.65398 13.2131 1.33398 10.4597 1.33398 5.79307C1.33398 3.73307 2.99398 2.06641 5.04065 2.06641C6.25398 2.06641 7.32732 2.65307 8.00065 3.55974C8.67398 2.65307 9.75399 2.06641 10.9607 2.06641C13.0073 2.06641 14.6673 3.73307 14.6673 5.79307C14.6673 10.4597 10.3473 13.2131 8.41398 13.8731Z'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={`${
            isLoading ? 'fill-none' : isFavorite ? 'fill-red-500' : 'fill-none'
          }`}
        />
      </svg>
      <span className='xsm:hidden'>
        {isLoading
          ? 'Đang xử lý...'
          : isFavorite
          ? 'Bỏ yêu thích'
          : 'Thêm vào danh sách yêu thích'}
      </span>
      <span className='xsm:block hidden'>
        {isLoading
          ? 'Đang xử lý...'
          : isFavorite
          ? 'Bỏ yêu thích'
          : 'Yêu thích'}
      </span>
    </Button>
  )
}

export default FavoriteButton
