import {ENV_API, ENV_CMS} from '@/config-global.env'
import parseRankMathHead from '@/fetches/parseRankMathHead'

export default async function getMetaDataRankMath(slug: string) {
  try {
    const res = await fetch(
      `${ENV_CMS!}${ENV_API!}rankmath/v1/getHead?url=${ENV_CMS!}${slug}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 60,
        },
      },
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.success || !data?.head) return null
    return parseRankMathHead(data.head) // Phân tách dữ liệu head
  } catch (error) {
    console.log(error)
    return null
  }
}
