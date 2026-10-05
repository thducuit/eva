import { ENV_API, ENV_CMS, ENV_DOMAIN } from "@/config-global.env"
import parseRankMathHead from "@/fetches/parseRankMathHead"

export default async function getSchemaMarkup(slug: string) {
  try {
    const res = await fetch(
      `${ENV_CMS!}${ENV_API!}rankmath/v1/getHead?url=${ENV_CMS!}${slug}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 86400,
        },
      },
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.success || !data?.head) return null
    const schemaMarkup = parseRankMathHead(data.head)
    return schemaMarkup?.schemaMarkup ? JSON.parse(JSON.stringify(schemaMarkup?.schemaMarkup).replaceAll(ENV_CMS!, ENV_DOMAIN!).replaceAll(ENV_DOMAIN! + '/author/ad_okhub/', 'https://okhub.vn/').replaceAll(ENV_DOMAIN! + '/wp-content/', ENV_CMS! + '/wp-content/').replaceAll(ENV_DOMAIN! + '/cruise-tours/', ENV_DOMAIN! + '/').replaceAll(ENV_DOMAIN! + '/tours/', ENV_DOMAIN! + '/cruise-tours/').replaceAll(ENV_DOMAIN! + '/news/', ENV_DOMAIN! + '/blog/')) : null
  } catch (error) {
    console.log(error)
    return null
  }
}
