import {ILink} from './link.interface'
import {IMedia} from './media.interface'

export interface IHeader {
  logo: IMedia
  menu: {
    page: ILink
    image: IMedia
  }[]
  contact: ILink
}

export interface IFooter {
  logo: IMedia
  contact_info: {
    address: string
    hotline: string
    email: string
  }
  about_us: {
    page: ILink
  }[]
  support: {
    page: ILink
  }[]
  background: IMedia
  image_decor: {
    front_image: IMedia
    behind_image: IMedia
  }
}
