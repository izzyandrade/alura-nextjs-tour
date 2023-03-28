import {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from 'next'
import { HttpClient } from '../../infra/HttpClient/HttpClient'
import { tokenService } from './tokenService'

interface AuthService {
  login: (params: { username: string; password: string }) => Promise<any>
  getSession: (context?: any) => Promise<any>
}

export const authService: AuthService = {
  async login({ username, password }) {
    return HttpClient(`/api/login`, {
      method: 'POST',
      body: {
        username,
        password,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Invalid user or password!')
        const { body } = res
        tokenService.save(body.data.access_token)
        return body
      })
      .catch((err) => {
        throw new Error(err)
      })
  },
  async getSession(context = null) {
    const token = tokenService.get(context)
    return HttpClient(`/api/session`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Something went wrong, try again later')
        return res.body.data
      })
      .catch((err) => {
        throw new Error(err)
      })
  },
}
