/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchData from '@/fetches/fetchData'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import getSchemaMarkup from '@/fetches/getSchemaMarkup'
import {IColorSet} from '@/types/colorSet.interface'
import metadataValues from '@/utils/metadataValues'
import ActionButtons from './_components/ActionButtons'
import ApartmentSwiper from './_components/ApartmentSwiper'
import ProductTabs from './_components/ProductTabs'
import PageProvider from './_components/context/PageProvider'

interface ColorSetDetailPageProps {
  params: Promise<{id: string; slug: string; index: string}>
}

export async function generateStaticParams() {
  const data = await fetchData({
    api: 'api/v1/params/apartments/details',
    method: 'GET',
  })
  return data.map(
    (item: {apartment_slug: string; style_slug: string; index: number}) => ({
      slug: item.apartment_slug,
      id: item.style_slug,
      index: item.index.toString(),
    }),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{id: string; slug: string; index: string}>
}) {
  const {slug} = await params
  const res = await getMetaDataRankMath(`/apartment/${slug}`)
  return metadataValues(res)
}

const ColorSetDetailPage = async ({params}: ColorSetDetailPageProps) => {
  const {id, slug, index} = await params
  // const {index} = await searchParams
  const [schemaData, colorSetData] = (await Promise.all([
    getSchemaMarkup(`/apartment/${slug}`),
    fetchData({
      api: `api/v1/apartments/${slug}/styles/${id}/${index}`,
      option: {
        next: {
          revalidate: 60,
        },
      },
    }),
  ])) as [any, IColorSet]

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData, null, 2),
        }}
      ></script>
      <PageProvider>
        <section className='h-[59.0625rem] w-full bg-[#000117] xsm:h-auto'>
          <div className='max-w-[87.5rem] mx-auto pt-[9.3125rem] xsm:px-[1.25rem] xsm:pt-[6.125rem]'>
            <div className='flex justify-between items-center'>
              <h1 className='text-[2rem] leading-[2.375rem] font-medium xsm:font-semibold  tracking-[0.005rem] text-white xsm:text-[1.25rem] xsm:leading-[1.625rem]'>
                {colorSetData?.color_set_name}
              </h1>
              <div className='flex items-center space-x-[0.75rem] xsm:hidden'>
                <ActionButtons colorSetData={colorSetData} />
              </div>
            </div>

            <div className='flex gap-x-[1.5rem] mt-[1.9375rem] xsm:flex-col'>
              <ApartmentSwiper images={colorSetData?.galleries} />

              <p className='mt-[1.3125rem] text-[#EFEFEF] text-[0.875rem] leading-[1.375rem] tracking-[0.00219rem] w-[20.9375rem] xsm:block hidden'>
                {colorSetData?.description}
              </p>

              <div className='items-center space-x-[0.75rem] xsm:flex hidden mt-[1.25rem]'>
                <ActionButtons colorSetData={colorSetData} />
              </div>

              <div className='flex-1 xsm:mt-[2.5rem] '>
                <h2 className='text-[1.25rem] text-[#EFEFEF] font-semibold leading-[1.625rem] mb-[0.5rem]'>
                  Đồ rời phù hợp với phong cách
                </h2>

                <ProductTabs products={colorSetData} />
              </div>
            </div>

            <p className='mt-[2rem] text-[#EFEFEF] text-[0.875rem] leading-[1.375rem] tracking-[0.00219rem] w-[29.1875rem] xsm:hidden'>
              {colorSetData?.description}
            </p>
          </div>
        </section>
      </PageProvider>
    </>
  )
}

export default ColorSetDetailPage
