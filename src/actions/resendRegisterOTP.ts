/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import endpoints from "@/utils/endpoints"
import fetchData from "@/fetches/fetchData"



export const resendRegisterOTP = async (email: string) => {
  try {
    const res = await fetchData({
      api: endpoints.auth.resendRegisterOTP,
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
