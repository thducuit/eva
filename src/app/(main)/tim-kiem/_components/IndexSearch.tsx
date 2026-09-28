'use client'

import NavSearch from '@/app/(main)/tim-kiem/_components/NavSearch'
// import ProjectRelated from '@/app/(main)/tim-kiem/_components/ProjectRelated'
import ResultGrid from '@/app/(main)/tim-kiem/_components/ResultGrid'
import {
  RelatedProjectDataResType,
  SearchProjectDataResType,
  SearchProjectType,
} from '@/types/search.interface'
import {Suspense, useState} from 'react'

interface IndexSearchProps {
  searchParam: string
  searchData: SearchProjectDataResType
  relatedProject: RelatedProjectDataResType
}

export default function IndexSearch({
  searchParam,
  searchData,
  relatedProject,
}: IndexSearchProps) {
  const [data, setData] = useState<{
    param: string
    results: SearchProjectType[]
  }>({
    param: searchParam,
    results: searchData,
  })

  return (
    <main className='bg-[#000117] relative w-full pt-[9.75rem] xsm:pt-[5.87rem] pb-[5.94rem] xsm:pb-[7.12rem] xsm:px-4'>
      <div className='relative mx-auto w-[87.5rem] xsm:w-full'>
        <Suspense>
          <NavSearch setData={setData} />
          <ResultGrid data={data.results} />
        </Suspense>
        {/* <ProjectRelated data={relatedProject} /> */}
      </div>
    </main>
  )
}
