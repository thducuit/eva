'use client'
import ProjectCard from '@/app/_components/ProjectCard'
import {SearchProjectDataResType} from '@/types/search.interface'
import {useSearchParams} from 'next/navigation'

export default function ResultGrid({data}: {data: SearchProjectDataResType}) {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  return (
    <section className='w-full mt-[3rem] xsm:mt-5'>
      <div className='flex items-center h5 text-grey-50 xsm:text-[1rem] xsm:font-semibold xsm:leading-[1.62]'>
        <span className='whitespace-nowrap'>Kết quả cho:</span>
        <span className='text-p1 pl-3 xsm:pl-1'>{search}</span>
      </div>
      <div className='grid grid-cols-3 sm:gap-[1.44rem] mt-[2rem] xsm:mt-5 xsm:grid-cols-1 xsm:gap-4'>
        {/* {data.map((item: any) => (
          <div key={item.id}>{item.name}</div>
        ))} */}
        {Array.isArray(data) &&
          data.map((project, index) => (
            <div
              key={index}
              className='w-full h-[33.4rem] xsm:h-[26.6rem]'
            >
              <ProjectCard
                title={project?.name}
                images={project?.acf?.images ?? []}
                slug={project?.slug}
                type={project?.type}
              />
            </div>
          ))}
      </div>
    </section>
  )
}
