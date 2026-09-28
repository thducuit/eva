import {ENV_DOMAIN} from '@/config-global.env'
import fetchData from '@/fetches/fetchData'
import {MetadataRoute} from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = ENV_DOMAIN
  const lastModified = new Date()
  const staticPages = [
    '/',
    '/can-ho',
    '/du-an',
    '/tim-kiem',
    '/lien-he-tu-van',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: lastModified,
    priority: path === '/' ? 1 : 0.9,
  }))
  const [projects, apartments, apartmentsDetails, buildings] =
    await Promise.all([
      fetchData({
        api: 'api/v1/params/projects',
        method: 'GET',
      }),
      fetchData({
        api: 'api/v1/params/apartments',
        method: 'GET',
      }),
      fetchData({
        api: 'api/v1/params/apartments/details',
        method: 'GET',
      }),
      fetchData({
        api: 'api/v1/params/projects/buildings',
        method: 'GET',
      }),
    ])
  const projectsPages = projects.map((project: string) => ({
    url: `${baseUrl}/du-an/${project}`,
    lastModified: lastModified,
    priority: 0.8,
  }))
  const apartmentPages = apartments.map((apartment: string) => ({
    url: `${baseUrl}/can-ho/${apartment}`,
    lastModified: lastModified,
    priority: 0.8,
  }))
  const apartmentsDetailsPages = apartmentsDetails.map(
    (apartmentDetail: {
      apartment_slug: string
      style_slug: string
      index: string
    }) => ({
      url: `${baseUrl}/can-ho/${apartmentDetail.apartment_slug}/bo-mau/${apartmentDetail.style_slug}/${apartmentDetail.index}`,
      lastModified: lastModified,
      priority: 0.7,
    }),
  )
  const buildingsPages = buildings.map(
    (building: {project_slug: string; building_slug: string}) => ({
      url: `${baseUrl}/du-an/${building.project_slug}${building.building_slug}`,
      lastModified: lastModified,
      priority: 0.7,
    }),
  )
  return [
    ...staticPages,
    ...projectsPages,
    ...apartmentPages,
    ...apartmentsDetailsPages,
    ...buildingsPages,
  ]
}
