import {IMedia} from '@/types/media.interface'
export type ProjectImplementStatusType = 'active' | 'inactive'

export type ProjectAcfType = {
  title: string
  images: IMedia[]
}
export type ProjectDataType = {
  id: number
  name: string
  slug: string
  acf: ProjectAcfType
}
export type ProjectDataResType = ProjectDataType[]

export type ProjectDetailResData = {
  acf: {
    title: string
    images: IMedia
    background?: IMedia
    implement_status: ProjectImplementStatusType
    not_yet_implement: {
      title: string
      subtitle: string
      desc: string
      background_image: IMedia
    }
  }
  da_image: {
    id: number
    featured_image: IMedia
    permalink: string
    slug: string
    status: string
    title: string
    type: string
    meta: unknown
  }
  id: number
  name: string
  slug: string
}
