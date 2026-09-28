/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import endpoints from "@/utils/endpoints"
import fetchDataAuth from "@/fetches/fetchDataAuth"


interface ChangePasswordProps {
  current_password: string
  new_password: string
}

export const changePassword = async (args: ChangePasswordProps) => {
  try {
    const res = await fetchDataAuth({
      api: endpoints.auth.changePassword,
      method: 'PUT',
      option: {
        body: JSON.stringify(args),
      },
    })
    return res
  } catch (error) {
    return false
  }
}
