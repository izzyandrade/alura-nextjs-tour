import { HttpClient } from '../../infra/HttpClient/HttpClient'

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
        const body = await res.body
        return body
      })
      .catch((err) => {
        throw new Error(err)
      })
  },
}
