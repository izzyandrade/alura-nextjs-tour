import { GetServerSidePropsContext } from 'next/types'
import nookies from 'nookies'

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY'

const ONE_SECOND = 1
const ONE_MINUTE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_YEAR = ONE_DAY * 365

export const tokenService = {
  save(access_token: string, context: GetServerSidePropsContext | null = null) {
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, access_token)
    globalThis?.sessionStorage?.setItem(ACCESS_TOKEN_KEY, access_token)
    nookies.set(context, ACCESS_TOKEN_KEY, access_token, {
      maxAge: ONE_YEAR,
      path: '/',
    })
  },
  get(context: GetServerSidePropsContext | null = null) {
    const cookies = nookies.get(context)
    return cookies[ACCESS_TOKEN_KEY]
  },
  delete(context: GetServerSidePropsContext | null = null) {
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY)
    globalThis?.sessionStorage?.removeItem(ACCESS_TOKEN_KEY)
    nookies.destroy(context, ACCESS_TOKEN_KEY)
  },
}
