import { ENV_API, ENV_CMS } from "@/config-global.env"

const baseURL =
  ENV_CMS! + ENV_API!
export const fetcher = async (url: string, baseCustom?: string) => {
  const response = await fetch(`${baseCustom || baseURL}${url}`)
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  return response.json()
}
