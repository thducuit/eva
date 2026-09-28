/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {Input} from '@/components/ui/input'
import {useTransition, useEffect, useState, useRef} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import LoadingCircleSpin from '@/components/loading/LoadingCircleSpin'
import {cn} from '@/lib/utils'
import pathPage from '@/utils/pathPage'
import {useDebounce} from '@/hooks/useDebounce'
import fetchData from '@/fetches/fetchData'
import endpoints from '@/utils/endpoints'

type NavSearchProps = {
  setData: (data: any) => void
}

export default function NavSearch({setData}: NavSearchProps) {
  const [pending, startTransition] = useTransition()
  const [isMobile, setIsMobile] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Debounce search value for mobile (1s delay)
  const debouncedSearchValue = useDebounce(searchValue, 1000)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Set initial value
  useEffect(() => {
    if (initialSearch) {
      setSearchValue(initialSearch)
      setIsDisabled(false)
      if (searchInputRef.current) {
        searchInputRef.current.value = initialSearch
      }
    }
  }, [initialSearch])

  // Handle debounced search for mobile
  useEffect(() => {
    if (isMobile && debouncedSearchValue !== initialSearch) {
      if (debouncedSearchValue.trim()) {
        // Has search query - update URL and search
        setIsSearching(true)

        const encodedQuery = encodeURIComponent(debouncedSearchValue.trim())
        router.push(`${pathPage.search}?search=${encodedQuery}`, {
          scroll: false,
        })

        performSearch(debouncedSearchValue)
      } else {
        // Empty search query - clear URL and reset data
        router.push(pathPage.search, {
          scroll: false,
        })
        setData(null)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue, isMobile, initialSearch])

  // Perform search function
  const performSearch = async (query: string) => {
    if (!query.trim()) return

    startTransition(async () => {
      try {
        // TODO: Implement actual search API call
        // const res = await searchAPI(query)
        // setData(res)

        // Simulate API call for now
        const data = await fetchData({
          api: endpoints.search.searchByKey(searchValue),
        })
        setData({query, results: data})
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsSearching(false)
      }
    })
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    setIsDisabled(!value.trim())
  }

  // Handle search submit
  const handleSearch = () => {
    const searchQuery = searchValue.trim()

    if (searchQuery) {
      // Has search query - update URL and search
      const encodedQuery = encodeURIComponent(searchQuery)
      router.push(`${pathPage.search}?search=${encodedQuery}`, {
        scroll: false,
      })
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      // For desktop, perform search immediately
      if (!isMobile) {
        startTransition(async () => {
          try {
            await performSearch(searchQuery)
          } catch (error) {
            console.log('🚀 ~ handleSearch ~ error:', error)
          }
        })
      }
    } else {
      // Empty search query - clear URL and reset data
      router.push(pathPage.search, {
        scroll: false,
      })
      setData(null)
    }
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='space-0 w-full'>
      <div className='flex items-center justify-between sm:space-x-5'>
        <div className='w-full mb-0 space-0 relative'>
          {!isSearching && <IconSearch />}
          {/* Mobile search loading indicator */}
          {isMobile && isSearching && (
            <div className='absolute right-3 top-1/2 -translate-y-1/2 z-10'>
              <LoadingCircleSpin className='size-4 text-white' />
            </div>
          )}
          <Input
            ref={searchInputRef}
            placeholder='Tìm kiếm thông tin về dự án, sản phẩm'
            className='rounded-[0.5rem] border border-solid border-white/60 bg-[#101A49] input-field text-white placeholder:text-grey-200 outline-none focus:outline-none focus-visible:border-none h-[2.875rem] w-full sm:pl-[2.62rem] xsm:pr-[2.6rem]'
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            defaultValue={initialSearch}
          />
        </div>
        <button
          type='button'
          onClick={handleSearch}
          disabled={isDisabled || pending}
          className='h-[2.75rem] rounded-[0.5rem] overflow-hidden bg-button-normal group px-6 w-fit relative block xsm:w-full disabled:cursor-not-allowed xsm:hidden'
        >
          <div className='absolute left-0 size-full bg-button-hover z-[5] opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300'></div>
          <div className='flex items-center justify-center size-full relative z-10'>
            {pending && (
              <LoadingCircleSpin className='size-[1.75rem] absolute-center' />
            )}
            <span
              className={cn(
                'button-2 text-p3 whitespace-nowrap',
                pending && 'opacity-0',
              )}
            >
              TÌM KIẾM
            </span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              className={cn(
                'size-[1rem] ml-2 shrink-0',
                pending && 'opacity-0',
              )}
            >
              <path
                d='M3.33398 8H12.6673M12.6673 8L8.66732 4M12.6673 8L8.66732 12'
                stroke='#000117'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}

const IconSearch = () => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        className='size-[1.25rem] absolute left-3 top-1/2 -translate-y-1/2 xsm:hidden'
      >
        <path
          d='M9.58496 1.54102C14.017 1.54119 17.626 5.15092 17.626 9.58301C17.6258 14.0149 14.0169 17.6238 9.58496 17.624C5.15288 17.624 1.54315 14.0151 1.54297 9.58301C1.54297 5.15082 5.15277 1.54102 9.58496 1.54102ZM9.58496 1.79102C5.28345 1.79102 1.79297 5.29057 1.79297 9.58301C1.79314 13.8753 5.28356 17.374 9.58496 17.374C13.8862 17.3738 17.3758 13.8752 17.376 9.58301C17.376 5.29068 13.8863 1.79119 9.58496 1.79102Z'
          fill='#CCCCCC'
          stroke='#CCCCCC'
        />
        <path
          d='M18.3326 18.9576C18.1742 18.9576 18.0159 18.8992 17.8909 18.7742L16.2242 17.1076C15.9826 16.8659 15.9826 16.4659 16.2242 16.2242C16.4659 15.9826 16.8659 15.9826 17.1076 16.2242L18.7742 17.8909C19.0159 18.1326 19.0159 18.5326 18.7742 18.7742C18.6492 18.8992 18.4909 18.9576 18.3326 18.9576Z'
          fill='#CCCCCC'
        />
      </svg>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        className='sm:hidden absolute right-[0.88rem] top-1/2 -translate-y-1/2 z-10'
      >
        <path
          d='M10 10L14 14M6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333Z'
          stroke='white'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </>
  )
}
