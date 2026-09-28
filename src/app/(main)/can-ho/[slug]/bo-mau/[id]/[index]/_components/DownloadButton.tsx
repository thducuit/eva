'use client'

import {Button} from '@/components/ui/button'
import {IColorSet} from '@/types/colorSet.interface'
import {DownloadIcon} from 'lucide-react'
import {useSession} from 'next-auth/react'
import {useMemo} from 'react'
import {toast} from 'sonner'

const DownloadButton = ({
  colorSetData,
  setOpenSelectApartment,
}: {
  colorSetData: IColorSet
  setOpenSelectApartment: (open: boolean) => void
}) => {
  const {data: session} = useSession()

  const canDownload = useMemo(() => {
    if (!Array.isArray(colorSetData.customer_codes)) {
      return false
    }
    return colorSetData.customer_codes.some(
      (code) => code.name === session?.user?.customer_code,
    )
  }, [colorSetData.customer_codes, session?.user?.customer_code])

  const handleDownload = async () => {
    if (canDownload) {
      if (colorSetData.file_images.url) {
        window.open(colorSetData.file_images.url, '_blank')
      } else {
        toast.error('Không có hình ảnh để tải')
      }
    } else {
      toast.error(
        'Bạn không có quyền tải hình ảnh, vui lòng nhập thông tin liên hệ',
      )
      setOpenSelectApartment(true)
    }
  }
  return (
    <Button
      variant={'tertiary'}
      text={'default'}
      className='flex-center text-white h-[2.75rem] w-[9.5625rem] uppercase xsm:w-[9.9375rem]'
      onClick={handleDownload}
    >
      <DownloadIcon className='size-4' />
      <span>Tải hình ảnh</span>
    </Button>
  )
}

export default DownloadButton
