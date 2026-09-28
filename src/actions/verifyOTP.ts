/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import endpoints from "@/utils/endpoints"
import fetchData from "@/fetches/fetchData"


interface VerifyOTPProps {
  email: string
  otp_code: string
}

export const verifyOTP = async (args: VerifyOTPProps) => {
  try {
    const res = await fetchData({
      api: endpoints.auth.verifyOTP,
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
