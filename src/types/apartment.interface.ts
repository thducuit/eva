import {IMedia} from '@/types/media.interface'

export interface IApartment {
  id: number
  name: string
  slug: string
  featured_image: IMedia
}
