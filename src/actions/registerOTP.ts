/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import endpoints from "@/utils/endpoints"
import fetchData from "@/fetches/fetchData"

interface RegisterOTPProps {
  email: string
  otp_code: string
}

export const registerOTP = async (args: RegisterOTPProps) => {
  try {
    const res = await fetchData({
      api: endpoints.auth.registerOTP,
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
