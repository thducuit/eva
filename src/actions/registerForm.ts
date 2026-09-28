/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import fetchData from '@/fetches/fetchData'
import endpoints from '@/utils/endpoints'

type Values = {
  email: string
  first_name: string
  username: string
  customer_code: string
  password: string
}

export const registerForm = async (values: Values) => {
  try {
    const res = await fetchData({
      api: endpoints.auth.register,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      option: {
        body: JSON.stringify(values),
      },
    })

    return res
  } catch (error) {
    return false
  }
}
