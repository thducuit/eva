import BackgroundGradients from '@/app/_components/BackgroundGradients'
import ProjectNavigation from '@/app/_components/ProjectNavigation'
import ProjectSlide from '@/app/_components/ProjectSlide'
import fetchData from '@/fetches/fetchData'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import getSchemaMarkup from '@/fetches/getSchemaMarkup'
import {ProjectDataResType} from '@/types/projects.interface'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'
import Image from 'next/image'

export async function generateMetadata() {
  const res = await getMetaDataRankMath('')
  return metadataValues(res)
}

const HomePage = async () => {
  const [schemaData] = await Promise.all([getSchemaMarkup('')])
  const projectData: ProjectDataResType = await fetchData({
    api: endpoints.project.list,
    method: 'GET',
  })

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData, null, 2),
        }}
      ></script>
      <section className='w-full h-[49.25rem] bg-white relative overflow-hidden flex items-center'>
        <h1 className='sr-only'>AMA Design & Build</h1>
        <Image
          src={'/homepage/d-bg.webp'}
          alt='d-bg'
          width={1600}
          height={788}
          className='w-full h-full object-cover absolute top-0 left-0'
        />

        <BackgroundGradients />

        <ProjectSlide projects={projectData} />

        <ProjectNavigation />

        <div className='project-list-pagination'></div>
      </section>
    </>
  )
}

export default HomePage
