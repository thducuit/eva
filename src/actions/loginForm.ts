/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

type ValuesProps = {
  email: string
  password: string
  redirectTo?: string
}

export const loginForm = async (values: ValuesProps) => {
  try {
    await signIn('credentials', {
      redirect: false,
      redirectTo: values.redirectTo || '/',
      email: values.email,
      password: values.password,
    })

    return { ok: true }
  } catch (err) {
    if (err instanceof AuthError) {
      // 1) Trường hợp ném trực tiếp CredentialsSignin
      if (err.type === 'CredentialsSignin') {
        const code = (err.cause as any)?.code ?? 'credentials'
        const message = err.message || 'Sign in failed'
        return { ok: false, code, message, cause: err.cause }
      }

      // 2) Trường hợp bị bọc trong CallbackRouteError (như log của bạn)
      if (err.type === 'CallbackRouteError') {
        return { ok: false, code: err.type, message: err.message, cause: err.cause?.err?.message }
      }

      // 3) Các loại AuthError khác (OAuthCallback, AccountNotLinked, …)
      return { ok: false, code: err.type, message: err.message || 'Auth error', cause: err.cause }
    }

    // Non-AuthError (rất hiếm), hoặc NEXT_REDIRECT (không xảy ra vì redirect:false)
    return { ok: false, code: 'unknown', message: 'Unexpected error' }
  }
}
