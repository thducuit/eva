import {IMedia} from './media.interface'

export interface IProduct {
  product: {
    id: number
    name: string
    slug: string
    featured_image: IMedia
    desc: string
    wide: string
    deep: string
    high: string
    price: string
    unit: string
    type: string
    is_replace: boolean
  }
  wide: string
  deep: string
  high: string
  quantity: string
  spaces: {
    name: string
    term_id: number
  }
}

export interface IReplacementProduct {
  id: number
  name: string
  slug: string
  featured_image: IMedia
  product_id: string
  desc: string
  wide: string
  deep: string
  high: string
  price: string
  unit: string
  is_replace: boolean
  quantity: string
  spaces: string
  image: string
  line_difference: number
  product_type: 'buy_more' | 'replacement'
}

export interface IColorSet {
  index: string
  project_id: number
  building_id: number
  floor_id: number
  style_id: number
  apartment_id: number
  apartment_type_id: number
  color_set_name: string
  description: string
  galleries: IMedia[]
  customer_codes?: {
    name: string
  }[]
  file_images: {
    url: string
  }
  product_group_1: IProduct[]
  product_group_2: IProduct[]
  product_group_4: IProduct[]
}
