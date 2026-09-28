import FloorPlan from '@/app/(main)/du-an/[slug]/[id]/_components/FloorPlan'
import fetchData from '@/fetches/fetchData'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import getSchemaMarkup from '@/fetches/getSchemaMarkup'
import {FloorDataResType} from '@/types/floor-plan.interface'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'
import Image from 'next/image'

interface FloorDetailPageProps {
  params: Promise<{
    slug: string
    id: string
  }>
}

export async function generateStaticParams() {
  const data = await fetchData({
    api: 'api/v1/params/projects/buildings',
    method: 'GET',
  }).catch(() => [])
  if (!Array.isArray(data)) return []
  return data.map((item: {project_slug: string; building_slug: string}) => ({
    slug: item.project_slug,
    id: item.building_slug.replace('/', ''),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string; id: string}>
}) {
  const {slug, id} = await params
  const res = await getMetaDataRankMath(`/${slug}/${id}`)
  return metadataValues(res)
}

const FloorDetailPage = async ({params}: FloorDetailPageProps) => {
  const {slug, id} = await params
  const [schemaData] = await Promise.all([getSchemaMarkup(`/${slug}/${id}`)])
  const data: FloorDataResType = await fetchData({
    api: endpoints.project.building.floor.detail(slug, id),
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
      <section className='xsm:h-[49.4375rem] relative h-screen w-full'>
        <div className='absolute inset-0 z-0'>
          <Image
            alt=''
            width={1600}
            height={788}
            src={
              '/mat-bang-tang/d_toa-nha-cao-thu-3-viet-nam-lotter-center-ha-noi 1.webp'
            }
            className='size-full object-cover'
          />
          <div className='absolute bottom-0 left-0 w-full h-[18.6875rem] bg-[linear-gradient(180deg,rgba(0,1,23,0.00)_6.62%,#000117_100%)]'></div>
          <div className='absolute top-0 left-0 w-full h-[46.875rem] bg-[linear-gradient(180deg,rgba(0,1,23,0.00)_0%,#000117_100%)] opacity-65 rotate-180'></div>
          <div className='absolute top-0 left-0 w-full h-[46.875rem] bg-[linear-gradient(180deg,rgba(0,1,23,0.00)_0%,#000117_100%)] opacity-65 rotate-180'></div>
        </div>
        <div className='relative z-1'>
          <FloorPlan data={data} />
        </div>
      </section>
    </>
  )
}

export default FloorDetailPage
