import {IMedia} from '@/types/media.interface'
import {ProjectImplementStatusType} from '@/types/projects.interface'

export type RelatedProjectType = {
  id: number
  name: string
  slug: string
  type?: string
  acf: {
    images: IMedia[]
    title: string
    implement_status: ProjectImplementStatusType
    not_yet_implement: {
      title: string
      subtitle: string
      desc: string
      background_image: IMedia
    }
  }
}
export type RelatedProjectDataResType = RelatedProjectType[]
export type SearchProjectType = RelatedProjectType
export type SearchProjectDataResType = SearchProjectType[]
