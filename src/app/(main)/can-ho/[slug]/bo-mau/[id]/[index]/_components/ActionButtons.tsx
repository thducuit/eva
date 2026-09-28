'use client'

import fetchData from '@/fetches/fetchData'
import {IColorSet, IReplacementProduct} from '@/types/colorSet.interface'
import endpoints from '@/utils/endpoints'
import {useSession} from 'next-auth/react'
import {useContext, useState} from 'react'
import {toast} from 'sonner'
import {PageContext, PageContextType} from './context/PageProvider'
import DownloadButton from './DownloadButton'
import FavoriteButton from './FavoriteButton'
import QuoteDownloadSheet from './QuoteDownloadSheet'
import SelectApartmentButton from './SelectApartmentButton'

const ActionButtons = ({colorSetData}: {colorSetData: IColorSet}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [openPopupDownload, setOpenPopupDownload] = useState(false)
  const [openSelectApartment, setOpenSelectApartment] = useState(false)
  const [data, setData] = useState<{
    products: IReplacementProduct[]
    quote_info: {total_amount: number; total_difference: number}
  }>()
  const {replaceProducts, buyMoreProductId} = useContext(
    PageContext,
  ) as PageContextType
  const {data: session} = useSession()

  const handleDownload = async () => {
    setIsDownloading(true)
    const data = {
      customer_name: session?.user?.username,
      phone: session?.user?.phone,
      project_id: colorSetData.project_id,
      building_id: colorSetData.building_id,
      level_id: colorSetData.floor_id,
      apartment_id: colorSetData.apartment_id,
      apartment_type_id: colorSetData.apartment_type_id,
      style_id: colorSetData.style_id,
      replace_product: replaceProducts,
      buy_more: buyMoreProductId,
    }

    try {
      if (!session?.accessToken) {
        toast.error('Vui lòng đăng nhập để tải báo giá')
        return
      }

      // Check if there are no replace products or buy more products
      if (
        (!replaceProducts || replaceProducts.length === 0) &&
        (!buyMoreProductId || buyMoreProductId.length === 0)
      ) {
        toast.error(
          'Vui lòng chọn sản phẩm thay thế hoặc mua thêm để tải báo giá',
        )
        return
      }
      // if (!session?.user?.phone) {
      //   toast.error('Vui lòng cập nhật số điện thoại')
      //   return
      // }

      const res = await fetchData({
        api: endpoints.downloadApi.api,
        method: 'POST',
        option: {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      })

      if (res?.data?.download_url) {
        window.location.href = res?.data?.download_url
      } else {
        toast.error('Không nhận được đường dẫn tải báo giá')
      }
    } catch (error) {
      console.log('🚀 ~ handleDownload ~ error:', error)
      toast.error('Không nhận được đường dẫn tải báo giá')
    } finally {
      setIsDownloading(false)
    }

    console.log('🚀 ~ handleDownload ~ data:', data)
    console.log(JSON.stringify(data))
  }

  const handleGetData = async () => {
    // Check if there are no replace products or buy more products first
    if (
      (!replaceProducts || replaceProducts.length === 0) &&
      (!buyMoreProductId || buyMoreProductId.length === 0)
    ) {
      toast.error(
        'Vui lòng chọn sản phẩm thay thế hoặc mua thêm để tải báo giá',
      )
      setOpenPopupDownload(false)
      return
    }

    if (!session?.accessToken) {
      toast.error('Vui lòng đăng nhập để tải báo giá')
      return
    }

    setIsLoading(true)
    const data = {
      customer_name: session?.user?.username,
      phone: session?.user?.phone,
      project_id: colorSetData.project_id,
      building_id: colorSetData.building_id,
      level_id: colorSetData.floor_id,
      apartment_id: colorSetData.apartment_id,
      apartment_type_id: colorSetData.apartment_type_id,
      style_id: colorSetData.style_id,
      replace_product: replaceProducts,
      buy_more: buyMoreProductId,
    }

    try {
      // if (!session?.user?.phone) {
      //   toast.error('Vui lòng cập nhật số điện thoại')
      //   router.push('/tai-khoan')
      //   return
      // }

      const res = await fetchData({
        api: endpoints.downloadApi.get,
        method: 'POST',
        option: {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      })

      console.log(data)
      console.log(JSON.stringify(data))

      if (res?.data) {
        console.log('🚀 ~ handleGetData ~ res?.data:', res?.data)
        setData(res?.data)
      } else {
        toast.error('Không nhận được dữ liệu báo giá')
      }
    } catch (error) {
      console.log('🚀 ~ handleDownload ~ error:', error)
      toast.error('Không nhận được dữ liệu báo giá')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center xsm:grid xsm:grid-cols-2 space-x-[0.75rem] xsm:space-x-0 xsm:gap-[0.5rem]'>
      <SelectApartmentButton
        openSelectApartment={openSelectApartment}
        setOpenSelectApartment={setOpenSelectApartment}
      />
      <DownloadButton
        setOpenSelectApartment={setOpenSelectApartment}
        colorSetData={colorSetData}
      />
      <QuoteDownloadSheet
        openPopupDownload={openPopupDownload}
        setOpenPopupDownload={setOpenPopupDownload}
        onGetData={handleGetData}
        onDownload={handleDownload}
        data={data}
        isLoading={isLoading}
        colorSetData={colorSetData}
        isDownloading={isDownloading}
      />
      <FavoriteButton colorSetData={colorSetData} />
    </div>
  )
}

export default ActionButtons
