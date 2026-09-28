/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import endpoints from "@/utils/endpoints"
import fetchDataAuth from "@/fetches/fetchDataAuth"

interface UpdateProfileProps {
  username: string
  phone: string
  customer_code: string
}
export const updateProfile = async ({ username, phone, customer_code }: UpdateProfileProps) => {
  try {
    const res = await fetchDataAuth({
      api: endpoints.auth.updateInfo,
      method: 'PUT',
      option: {
        body: JSON.stringify({
          first_name: username,
          phone,
          customer_code,
        }),
      },
    })
    return res
  } catch (error) {
    return false
  }
}
