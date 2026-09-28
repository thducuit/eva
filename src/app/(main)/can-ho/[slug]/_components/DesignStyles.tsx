'use client'

import ImageFallback from '@/components/image/ImageFallback'
import {Separator} from '@/components/ui/separator'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {convertRemToPx} from '@/lib/utils'
import {Swiper, SwiperSlide} from 'swiper/react'

import 'swiper/css'
import {Navigation} from 'swiper/modules'
import {NavigationSwiperIcon} from '@/components/icon'
import useIsMobile from '@/hooks/useIsMobile'
import {IStyle, IStyleDetail} from '@/types/style.interface'
import {Fragment, useEffect, useState} from 'react'
import fetchData from '@/fetches/fetchData'
import endpoints from '@/utils/endpoints'
import {Skeleton} from '@/components/ui/skeleton'
import Link from 'next/link'

interface DesignStylesProps {
  styles: IStyle[]
  apartmentSlug: string
}

const DesignStyles = ({styles, apartmentSlug}: DesignStylesProps) => {
  const isMobile = useIsMobile()
  const [activeSlug, setActiveSlug] = useState<string>(
    styles?.[0]?.slug ?? 'default',
  )
  const [details, setDetails] = useState<IStyleDetail[]>([])
  const [activeLinkYtb, setActiveLinkYtb] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Convert YouTube link to embed format
  const convertToEmbedUrl = (url: string): string => {
    if (!url) return ''

    // Check if already embed URL
    if (url.includes('embed')) return url

    // Extract video ID from various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`
      }
    }

    return url
  }

  useEffect(() => {
    if (!activeSlug || activeSlug === 'default') return

    const fetchDetails = async () => {
      try {
        setIsLoading(true)
        const res = await fetchData({
          api: `${endpoints.apartment.list}/${apartmentSlug}/${endpoints.style.detail}/${activeSlug}`,
          option: {
            next: {revalidate: 60},
          },
        })
        setDetails(Array.isArray(res) ? res : res?.data ?? [])
        console.log(res.link_ytb)
        setActiveLinkYtb(res?.link_ytb ?? '')
      } catch (e) {
        console.log(e)
        setDetails([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetails()
  }, [activeSlug, apartmentSlug])

  const slidesPerView = isMobile ? 1 : 3
  const showNavigation = !isLoading && details.length > slidesPerView

  return (
    <section className='w-full h-fit xsm:h-auto xsm:pb-[3.75rem] bg-[#000117] overflow-hidden mt-[-1px]'>
      <div className='max-w-[87.5rem] mx-auto pt-[3.75rem]'>
        <h2 className='text-[#efefef] text-[2rem] font-medium leading-[2.375rem] tracking-[0.005rem] xsm:text-[1.25rem] xsm:font-semibold xsm:leading-[1.625rem] xsm:pl-[1.25rem]'>
          Các phong cách thiết kế
        </h2>
      </div>

      <Tabs
        value={activeSlug}
        onValueChange={setActiveSlug}
        className='w-[16.875rem] xsm:w-full pl-[6.25rem] mt-[2rem] xsm:pl-[1.25rem] xsm:overflow-x-auto xsm:mt-[1rem]'
      >
        <TabsList className='bg-transparent mb-[0.5rem] p-0'>
          {Array.isArray(styles) &&
            styles.map((style, index) => (
              <Fragment key={style.slug}>
                <TabsTrigger
                  className='text-base uppercase text-center cursor-pointer text-white font-semibold leading-[0.875rem] tracking-[0.01rem] data-[state=active]:bg-transparent data-[state=active]:text-[#F6E280] p-0 relative after:content-[""] after:absolute after:bottom-[-0.125rem] after:left-0 after:h-[0.125rem] after:bg-[#F6E280] after:w-0 data-[state=active]:after:w-full after:transition-[width] after:duration-300 after:ease-out xsm:text-[0.75rem] xsm:leading-[0.75rem] xsm:tracking-[0.0075rem] lg:hover:text-[#F6E280] lg:hover:after:w-full'
                  value={style?.slug}
                >
                  {style?.title}
                </TabsTrigger>
                {index !== styles.length - 1 && (
                  <Separator
                    orientation='vertical'
                    className='h-[0.75rem]! border-[0.125rem]! border-[#D9D9D9] rounded-[0.3125rem] opacity-30 mx-[1.25rem] xsm:mx-[0.6125rem]'
                  />
                )}
              </Fragment>
            ))}
        </TabsList>

        <TabsContent
          value={activeSlug}
          className='w-[99.5vw] xsm:w-full ml-[-6.25rem] mt-[1.875rem] xsm:ml-[-1.25rem] xsm:mt-[1rem]'
        >
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={convertRemToPx(0.07)}
            className='w-full h-[35.625rem] xsm:h-[25.0625rem] xsm:w-[23.4375rem]'
            modules={[Navigation]}
            navigation={
              showNavigation
                ? {
                    nextEl: '.color-next',
                    prevEl: '.color-prev',
                  }
                : false
            }
            speed={700}
          >
            {isLoading
              ? Array.from({length: isMobile ? 1 : 3}).map((_, index) => (
                  <SwiperSlide key={`skeleton-${index}`}>
                    <div className='relative opacity-50'>
                      <div className='flex space-x-[2rem] absolute left-[1.5rem] top-[1.5rem]'>
                        <Skeleton className='h-[1.625rem] w-[2.5rem] rounded-sm' />
                        <Skeleton className='h-[1.625rem] w-[14.8125rem] rounded-sm' />
                      </div>
                      <Skeleton className='w-[33.29rem] xsm:w-[23.4375rem] xsm:h-[25.0625rem] h-[35.625rem] rounded-md' />
                    </div>
                  </SwiperSlide>
                ))
              : details.map((style, index) => (
                  <SwiperSlide key={index}>
                    <Link
                      href={`/can-ho/${apartmentSlug}/bo-mau/${activeSlug}/${style.index}`}
                    >
                      <div className='relative group'>
                        <div
                          className='w-full h-[11.5625rem] xsm:h-[8.125rem] absolute top-0 left-0 opacity-90'
                          style={{
                            background:
                              'linear-gradient(0deg, rgba(1, 2, 23, 0.00) 30%, #010217 100%)',
                          }}
                        />
                        <div
                          className='w-full h-[11.5625rem] xsm:h-[8.125rem] absolute top-0 left-0 opacity-0 lg:group-hover:opacity-90 transition-opacity duration-500 xsm:opacity-90'
                          style={{
                            background:
                              'linear-gradient(0deg, rgba(19, 24, 116, 0.00) 0%, #131874 100%)',
                          }}
                        />
                        <div className='flex space-x-[2rem] absolute left-[1.5rem] top-[1.5rem] text-[#efefef] text-[1.25rem] font-semibold leading-[1.625rem] xsm:text-base xsm:leading-[1.375rem] xsm:tracking-[0.0125rem] xsm:space-x-[1.5rem]'>
                          <p>0{index + 1}</p>
                          <p className='w-[14.8125rem]'>
                            {style?.color_set_name}
                          </p>
                        </div>
                        <ImageFallback
                          src={style?.featured_image.url}
                          alt={style?.featured_image.alt}
                          width={1400}
                          height={1000}
                          className='w-[33.29rem] xsm:w-[23.4375rem] xsm:h-[25.0625rem] h-[35.625rem] object-cover'
                          quality={100}
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
            {showNavigation && (
              <div className='pointer-events-none project-navigation xsm:w-[96%] absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 flex items-center justify-between w-[97.5rem] z-[2]'>
                <button className='pointer-events-auto color-prev size-[2rem] p-[0.48438rem_0.5625rem_0.42188rem_0.5625rem] rounded-[0.375rem] bg-[#dedede]/58 flex items-center justify-center cursor-pointer group hover:bg-[#F6E280] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'>
                  <NavigationSwiperIcon className='w-[0.875rem] h-[1.09375rem] group-hover:text-[#000117]' />
                </button>

                <button className='pointer-events-auto color-next size-[2rem] p-[0.48438rem_0.5625rem_0.42188rem_0.5625rem] rounded-[0.375rem] bg-[#dedede]/58 flex items-center justify-center cursor-pointer group hover:bg-[#F6E280] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'>
                  <NavigationSwiperIcon className='w-[0.875rem] h-[1.09375rem] rotate-180' />
                </button>
              </div>
            )}
          </Swiper>
        </TabsContent>
      </Tabs>
      {activeLinkYtb && (
        <div className='xsm:px-[1.25rem] mt-[1.19rem] w-[87.5rem] xsm:w-full mx-auto '>
          <div className='w-full aspect-video rounded-[0.375rem]'>
            <iframe
              src={convertToEmbedUrl(activeLinkYtb)}
              allowFullScreen
              className='w-full h-full rounded-[0.375rem]'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default DesignStyles
