/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import NextAuth, { CredentialsSignin } from 'next-auth'
import { jwtDecode } from "jwt-decode"

import fetchData from '@/fetches/fetchData'
import endpoints from '@/utils/endpoints'
import fetchDataAuth from '@/fetches/fetchDataAuth'
import { isoToUnixTimestamp } from '@/lib/utils'
import { ENV_AUTH_SECRET, ENV_GOOGLE_CLIENT_ID, ENV_GOOGLE_CLIENT_SECRET } from '@/config-global.env'

// NOTE: define theo responsive login của api, nên bắt BE quy chuẩn đúng với JWT
declare module 'next-auth' {
  interface User {
    expires?: string
    accessToken?: string
    refreshToken?: string
    accessExp?: number
    refreshExp?: number
    user?: {
      id?: number
      username?: string
      email?: string
      roles?: string[]
      email_verified?: boolean
      first_name?: string
      last_name?: string
      phone?: string
      customer_code?: string
    }
  }

  interface Session {
    expires?: string
    accessToken?: string
    refreshToken?: string
    accessExp?: number
    refreshExp?: number
    user?: {
      id?: number
      username?: string
      email?: string
      role?: string
      gender?: string
      date_of_birth?: string
      avatar_url?: string
      first_name?: string
      phone?: string
      customer_code?: string
    }
  }
}

function isValidCredentials(credentials: any): boolean {
  return credentials.email && credentials.password
}

async function refreshAccessToken(token: any) {
  try {
    // NOTE: Call api refresh token, thay endpoint vào đây và sửa lại theo responsive trả về và token truyền vào
    const res = await fetchData({
      method: 'POST' as const,
      api: endpoints.auth.refreshToken,
      option: {
        body: JSON.stringify({
          refresh_token: token?.refreshToken,
        }),
      },
    })
    if (!res?.token?.accessToken) {
      throw new Error('RefreshAccessTokenError')
    }
    return {
      ...token,
      accessToken: res?.token?.accessToken,
      refreshToken: res?.token?.refreshToken,
      refreshExp: isoToUnixTimestamp(res?.token?.refreshPayload?.exp),
      expires: isoToUnixTimestamp(res?.token?.accessPayload?.exp),
    }
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {

      if (token?.accessToken) {
        const decodedToken = jwtDecode(token.accessToken as string);
        token.accessExp = decodedToken.exp;
      }
      if (account && user) {
        if (account.provider === 'google') {
          const res = await fetchData({
            api: endpoints.auth.googleLogin,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            option: {
              body: JSON.stringify({
                provider: 'google',
                googleId: account.providerAccountId,
                name: user.name,
                email: user.email,
              }),
            },
          })
          return {
            user: { ...res?.data },
            accessToken: res?.token?.accessToken,
            refreshToken: res?.token?.refreshToken,
            refreshExp: isoToUnixTimestamp(res?.token?.refreshPayload?.exp),
            expires: isoToUnixTimestamp(res?.token?.accessPayload?.exp),
          }
        }
        return {
          ...token,
          ...user,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          refreshExp: user.refreshExp,
        }
      }
      if (trigger === 'update') {
        if (session?._action === 'updateInfo') {
          const dataMe = await fetchDataAuth({
            api: endpoints.auth.info,
          })
          const { success, data } = dataMe
          return ({
            ...token, user: {
              ...data
            }
          })
        }
        if (session?._action === 'refreshToken') {
          return refreshAccessToken(token)
        }
      }

      if (
        token?.accessExp &&
        Date.now() < (token?.accessExp as number) * 1000
      ) {
        return token
      }
      // Thực hiện refresh token khi exp < 30s
      return refreshAccessToken(token)
    },
    async session({ session, token }: { token: any; session: any }) {
      if (token) {
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
        session.refreshExp = token.refreshExp
        // NOTE: Thêm logic để lấy thông tin user từ api nếu cần truyền vào session
        session.user = token.user
        session.expires = token.expires
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Google({
      clientId: ENV_GOOGLE_CLIENT_ID,
      clientSecret: ENV_GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          if (!isValidCredentials(credentials)) {
            throw new Error('Invalid credentials')
          }
          // NOTE: Thực hiện call api login, thay endpoint và payload vào đây
          const request = {
            api: endpoints.auth.login,
            method: 'POST' as const,
            headers: {
              'Content-Type': 'application/json',
            },
            option: {
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            },
          }
          const res = await fetchDataAuth(request)

          if (res?.success) {
            return ({
              user: { ...res?.data },
              accessToken: res?.token?.accessToken,
              refreshToken: res?.token?.refreshToken,
              refreshExp: isoToUnixTimestamp(res?.token?.refreshPayload?.exp),
            })
          }
          if (res?.message?.includes('xác thực email')) {
            throw new CredentialsSignin(
              "email_not_verified",
              { cause: { code: "email_not_verified" } }
            )
          }
          throw new Error(res?.message)
        } catch (error) {
          throw new Error(error as string)
        }
      },
    }),
  ],
  secret: ENV_AUTH_SECRET, // NOTE: đưa biến này ra .env, sử dụng env.AUTH_SECRET
})
