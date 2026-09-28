/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import endpoints from "@/utils/endpoints"
import fetchData from "@/fetches/fetchData"


interface ResetPasswordProps {
  email: string
  otp_code: string
  new_password: string
}

export const resetPassword = async (args: ResetPasswordProps) => {
  try {
    const res = await fetchData({
      api: endpoints.auth.resetPassword,
      method: 'POST',
      option: {
        body: JSON.stringify(args),
      },
    })
    return res
  } catch (error) {
    return false
  }
}
