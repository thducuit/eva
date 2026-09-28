/* eslint-disable @typescript-eslint/no-explicit-any */
import {ENV_CMS} from '@/config-global.env'
import fetchData from '@/fetches/fetchData'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import getSchemaMarkup from '@/fetches/getSchemaMarkup'
import {IApartment} from '@/types/apartment.interface'
import {IStyle} from '@/types/style.interface'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'
import DesignStyles from './_components/DesignStyles'
import Hero from './_components/Hero'

interface ApartmentPageProps {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const data = await fetchData({
    api: 'api/v1/params/apartments',
    method: 'GET',
  }).catch(() => [])
  if (!Array.isArray(data)) return []
  return data.map((item: string) => ({slug: item}))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const res = await getMetaDataRankMath(`/apartment/${slug}`)
  console.log(`${ENV_CMS!}/apartment/${slug}`)
  return metadataValues(res)
}

const ApartmentPage = async ({params}: ApartmentPageProps) => {
  const {slug} = await params

  const [schemaData, apartmentData, styleData]: [any, IApartment, IStyle[]] =
    await Promise.all([
      getSchemaMarkup(`/apartment/${slug}`),
      fetchData({
        api: `${endpoints.apartment.list}/${slug}`,
        option: {
          next: {
            revalidate: 60,
          },
        },
      }),
      fetchData({
        api: `${endpoints.style.list}`,
        option: {
          next: {
            revalidate: 60,
          },
        },
      }),
    ])

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData, null, 2),
        }}
      ></script>
      <Hero
        title={apartmentData?.name}
        imageUrl={apartmentData?.featured_image?.url}
      />
      <DesignStyles
        styles={styleData}
        apartmentSlug={slug}
      />
    </>
  )
}

export default ApartmentPage
