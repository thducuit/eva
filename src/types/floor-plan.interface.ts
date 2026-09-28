export type FloorPlanType = {
  id: number
  permalink: string
  slug: string
  status: string
  title: string
  type: string
  excerpt: string
  featured_image: {
    alt: string
    url: string
  }
  meta: unknown
}
export type FloorDataResType = {
  id: number
  name: string
  slug: string
  da_image: FloorPlanType[]
}
