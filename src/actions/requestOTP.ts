/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import endpoints from "@/utils/endpoints"
import fetchData from "@/fetches/fetchData"



export const requestOTP = async (email: string) => {
  try {
    const res = await fetchData({
      api: endpoints.auth.requestOTP,
      method: 'POST',
      option: {
        body: JSON.stringify({
          email,
        }),
      },
    })
    return res
  } catch (error) {
    return false
  }
}
