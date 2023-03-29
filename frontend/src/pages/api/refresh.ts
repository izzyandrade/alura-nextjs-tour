import nookies from 'nookies'

const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_KEY'

const controllers = {
  async storeRefreshToken(req, res) {
    const ctx = { req, res }
    console.log('here')
    nookies.set(ctx, REFRESH_TOKEN_KEY, req.body.refresh_token, {
      httpOnly: true,
      semiSite: 'lax',
    })
    res.json({
      data: {
        message: 'Stored token with success',
      },
    })
  },
  async displayCookies(req, res) {
    const ctx = { req, res }
    res.json({
      data: {
        cookies: nookies.get(ctx),
      },
    })
  },
}

const controllerBy = {
  POST: controllers.storeRefreshToken,
  GET: controllers.displayCookies,
}

export default function handler(req, res) {
  if (controllerBy[req.method]) return controllerBy[req.method](req, res)

  res.status(404).json({
    status: 404,
    message: 'Not Found',
  })
}
