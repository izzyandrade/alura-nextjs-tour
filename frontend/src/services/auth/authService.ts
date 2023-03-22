import { HttpClient } from '../../infra/HttpClient/HttpClient'
import { tokenService } from './tokenService'

export const authService = {
  async login({ username, password }) {
    return HttpClient(`/api/login`, {
      method: 'POST',
      body: {
        username,
        password,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Usuário ou senha inválidos!')
        const { body } = res
        tokenService.save(body.data.access_token)
        return body
      })
      .catch((err) => {
        throw new Error(err)
      })
  },
}
