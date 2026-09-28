'use client'

import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {Input} from '@/components/ui/input'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {useState, useRef} from 'react'
import {
  ArrowRightIcon,
  SearchIcon,
  SearchInputIcon,
  XIcon,
} from '@/components/icon'
import pathPage from '@/utils/pathPage'

type SearchDialogProps = {
  logo: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
}

export const SearchDialog = ({logo}: SearchDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleInputChange = () => {
    const searchQuery = searchInputRef.current?.value || ''
    setIsDisabled(!searchQuery.trim())
  }

  const handleSearch = () => {
    const searchQuery = searchInputRef.current?.value || ''
    if (!searchQuery.trim()) return

    // Encode search query for URL
    const encodedQuery = encodeURIComponent(searchQuery.trim())

    // Navigate to search page with query parameter
    router.push(`${pathPage.search}?search=${encodedQuery}`)

    // Close dialog
    setIsOpen(false)

    // Clear search input
    if (searchInputRef.current) {
      searchInputRef.current.value = ''
      setIsDisabled(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant={'tertiary'}
          text={'default'}
          className='size-[2.75rem] flex-center'
        >
          <SearchIcon className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-[87.5rem] top-[25%] p-[1.75rem_1.75rem_2rem_1.75rem] rounded-[0.75rem] border-[0.8px] border-[#FFF] bg-[#0C0931]'>
        <DialogHeader>
          <DialogTitle className='flex items-center justify-between'>
            <Image
              src={logo?.url}
              alt={logo?.alt || ''}
              width={logo?.width || 200}
              height={logo?.height || 55}
              className='w-[12.51035rem] h-[3.41665rem] object-cover'
              quality={100}
            />
            <DialogClose className='cursor-pointer'>
              <XIcon className='size-[2.5rem]' />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className='flex items-center space-x-[1.25rem]'>
          <div className='p-[0.75rem] w-[74.625rem] h-[2.875rem] flex-center rounded-[0.5rem] border-[0.8px] border-[#fff]/60 bg-[#101A49]'>
            <SearchInputIcon className='size-[1.25rem]' />
            <Input
              ref={searchInputRef}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className='flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#B4B4B4] placeholder:text-[0.875rem] placeholder:leading-[1.375rem] caret-white text-white text-[0.875rem] leading-[1.375rem]'
              placeholder='Tìm kiếm thông tin về dự án, sản phẩm'
              autoFocus
              type='search'
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={isDisabled}
            variant={'primary'}
            text='default'
            className='w-[8.125rem] h-[2.75rem] flex-center space-x-[0.5rem] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <span className='relative z-[1] uppercase m-0'>Tìm kiếm</span>
            <ArrowRightIcon className='size-4 relative z-[1]' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
