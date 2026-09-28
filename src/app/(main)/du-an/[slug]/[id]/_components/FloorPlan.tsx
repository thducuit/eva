'use client'
import IndexFloorPlan from '@/app/(main)/du-an/[slug]/[id]/_components/IndexFloorPlan'
import {Tabs, TabsContent} from '@/components/ui/tabs'
import {cn} from '@/lib/utils'
import {FloorDataResType} from '@/types/floor-plan.interface'
import {useMemo, useState} from 'react'

type FloorPlanProps = {
  data: FloorDataResType
}

export default function FloorPlan({data}: FloorPlanProps) {
  const [currentFloor, setCurrentFloor] = useState<string>(() => {
    return data.da_image?.length ? data.da_image[0]?.slug : ''
  })
  const floorPlanName = useMemo(() => {
    const targetFloorPlan = data.da_image?.find(
      ({slug}) => slug === currentFloor,
    )
    return targetFloorPlan ? targetFloorPlan.title : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFloor])
  return (
    <>
      <div className='xsm:static xsm:w-full xsm:pt-[5.125rem] xsm:mb-[3.625rem] absolute top-[9.125rem] left-[6.25rem] w-[20.625rem] flex flex-col space-y-[2rem]'>
        <div className='flex flex-col space-y-[0.5rem] xsm:px-[1.3125rem]'>
          <h1 className='text-[1.5rem] font-semibold leading-[1.875rem] text-white capitalize'>
            Mặt Bằng {floorPlanName}
          </h1>
          <p className='text-[1rem] font-semibold leading-[1.375rem] tracking-[0.0125rem] text-white/70'>
            Chọn căn hộ của bạn
          </p>
        </div>
        <div className='xsm:overflow-x-auto xsm:flex-nowrap xsm: flex flex-wrap gap-[0.5rem] hidden_scroll'>
          {Array.isArray(data?.da_image) &&
            data?.da_image.map((item) => (
              <button
                key={item.slug}
                onClick={() => setCurrentFloor(item.slug)}
                className={cn(
                  'xsm:first:ml-[1.1875rem] xsm:last:mr-[1.1875rem] xsm:shrink-0 lg:hover:bg-[#0D1850] text-[0.875rem] px-[1.5rem] py-[0.75rem] rounded-[0.5rem] bg-[rgba(16,26,73,0.60)] cursor-pointer h-[2.75rem] transition-all duration-500',
                  currentFloor === item.slug && 'bg-[#0D1850]',
                )}
              >
                <span className='text-[#F6E280] text-[0.875rem] font-semibold tracking-[0.00875rem] leading-[0.875rem]'>
                  {item.title}
                </span>
              </button>
            ))}
        </div>
      </div>
      <div className='xsm:static xsm:w-[20.96875rem] xsm:mx-auto absolute w-[30.03125rem] top-[8.875rem] left-[35rem]'>
        <Tabs
          value={currentFloor}
          className='w-full h-full'
        >
          {data?.da_image?.map((item) => (
            <TabsContent
              key={item.slug}
              value={item.slug}
            >
              <IndexFloorPlan initialData={item} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
