import IndexSearch from '@/app/(main)/tim-kiem/_components/IndexSearch'
import fetchData from '@/fetches/fetchData'
import {
  RelatedProjectDataResType,
  SearchProjectDataResType,
} from '@/types/search.interface'
import endpoints from '@/utils/endpoints'

interface SearchPageProps {
  searchParams: Promise<{
    search: string
  }>
}
export default async function SearchPage({searchParams}: SearchPageProps) {
  const {search} = await searchParams
  const [searchData, relatedProject]: [
    SearchProjectDataResType,
    RelatedProjectDataResType,
  ] = await Promise.all([
    fetchData({
      api: endpoints.search.searchByKey(search),
    }),
    fetchData({
      api: endpoints.search.getRelated,
    }),
  ])
  return (
    <IndexSearch
      searchParam={search}
      searchData={searchData}
      relatedProject={relatedProject}
    />
  )
}
