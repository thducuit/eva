import {IMedia} from '@/types/media.interface'

export interface IStyle {
  id: number
  name: string
  slug: string
  title: string
}

export interface IStyleDetail {
  index: number
  color_set_name: string
  featured_image: IMedia
}
