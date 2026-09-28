import FloorPlan from '@/app/(main)/du-an/[slug]/[id]/_components/FloorPlan'
import ImplementedBuilding from '@/app/(main)/du-an/[slug]/_components/ImplementBuilding'
import IndexDetailBuilding from '@/app/(main)/du-an/[slug]/_components/IndexDetailBuilding'
import fetchData from '@/fetches/fetchData'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import getSchemaMarkup from '@/fetches/getSchemaMarkup'
import {FloorDataResType} from '@/types/floor-plan.interface'
import {ProjectDetailResData} from '@/types/projects.interface'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'
import Image from 'next/image'

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const res = await getMetaDataRankMath(`/${slug}`)
  return metadataValues(res)
}

export async function generateStaticParams() {
  const data = await fetchData({
    api: 'api/v1/params/projects',
    method: 'GET',
  }).catch(() => [])
  if (!Array.isArray(data)) return []
  return data.map((item: string) => ({slug: item}))
}

const ProjectDetailPage = async ({
  params,
}: {
  params: Promise<{slug: string}>
}) => {
  const {slug} = await params
  const [schemaData] = await Promise.all([getSchemaMarkup(`/${slug}`)])
  const data: ProjectDetailResData | FloorDataResType = await fetchData({
    api: endpoints.project.detail(slug),
    method: 'GET',
  })
  // const rootPathname = `${ROUTES.PROJECT}/${slug}`
  if ((data as ProjectDetailResData)?.acf?.implement_status === 'inactive') {
    return (
      <>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData, null, 2),
          }}
        ></script>
        <ImplementedBuilding
          title={(data as ProjectDetailResData)?.acf?.not_yet_implement?.title}
          subtitle={
            (data as ProjectDetailResData)?.acf?.not_yet_implement?.subtitle
          }
          desc={(data as ProjectDetailResData)?.acf?.not_yet_implement?.desc}
          background_image={
            (data as ProjectDetailResData)?.acf?.not_yet_implement
              ?.background_image
          }
        />
      </>
    )
  }

  if (Array.isArray(data.da_image)) {
    return (
      <section className='xsm:h-[49.4375rem] relative h-screen w-full'>
        <div className='absolute inset-0 z-0'>
          <Image
            alt=''
            width={1600}
            height={788}
            src={
              (data as ProjectDetailResData)?.acf?.background?.url ||
              '/du-an/default.webp'
            }
            className='size-full object-cover'
          />
          <div className='absolute bottom-0 left-0 w-full h-[18.6875rem] bg-[linear-gradient(180deg,rgba(0,1,23,0.00)_6.62%,#000117_100%)]'></div>
          <div className='absolute top-0 left-0 w-full h-[46.875rem] bg-[linear-gradient(180deg,rgba(0,1,23,0.00)_0%,#000117_100%)] opacity-65 rotate-180'></div>
          <div className='absolute top-0 left-0 w-full h-[46.875rem] bg-[linear-gradient(180deg,rgba(0,1,23,0.00)_0%,#000117_100%)] opacity-65 rotate-180'></div>
        </div>
        <div className='relative z-1'>
          <FloorPlan data={data as FloorDataResType} />
        </div>
      </section>
    )
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData, null, 2),
        }}
      ></script>
      <section className='w-full h-[49.25rem] xsm:h-[30.6875rem] relative overflow-hidden'>
        {/* <Image
        src={'/du-an/d-image.webp'}
        alt='bg'
        fill
        className='object-cover'
      /> */}
        <IndexDetailBuilding initialData={data.da_image} />

        <article className='absolute top-[9.75rem] left-[6.25rem] z-[5] xsm:top-[6.4375rem] xsm:left-[1.25rem]'>
          <h1 className='text-[1.5rem] text-white font-semibold leading-[1.875rem] mb-[0.5rem] xsm:text-[1.25rem] xsm:leading-[1.625rem]'>
            {data?.da_image?.title}
          </h1>
          <p className='text-white opacity-70 font-semibold leading-[1.375rem] tracking-[0.0125rem] xsm:text-[0.875rem] xsm:font-medium xsm:leading-[1.25rem] xsm:tracking-[0.00875rem]'>
            Chọn toà căn hộ của bạn
          </p>
        </article>

        <div className='w-[56.68644rem] h-[79.9835rem] rotate-[48.264deg] rounded-[79.9835rem] opacity-90 bg-[#000117] blur-[150px] absolute top-[-30rem] left-[-23.575rem]  pointer-events-none xsm:w-[30rem] xsm:h-[41rem] xsm:blur-[78px] xsm:left-[-30rem] xsm:top-[-20rem]' />

        <div className='w-[65.29438rem] h-[126.69731rem] rotate-[122.938deg] bg-[#0A0D46] opacity-90 blur-[150px] absolute bottom-[-5.5rem] right-[-15.6275rem] pointer-events-none xsm:w-[33rem] xsm:h-[65rem] xsm:blur-[78px] xsm:right-[-25rem] xsm:bottom-[-3rem]' />

        <div
          className='h-[18.6875rem] w-full absolute bottom-0 left-0 pointer-events-none xsm:h-[6.75rem]'
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 1, 23, 0.00) 6.62%, #000117 100%)',
          }}
        />
      </section>
    </>
  )
}

export default ProjectDetailPage
