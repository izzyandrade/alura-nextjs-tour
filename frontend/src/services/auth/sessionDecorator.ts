import { authService } from './authService'

export const withSession = (getProps: (ctx) => any) => {
  return async (ctx) => {
    try {
      const userSession = await authService.getSession(ctx)
      const authenticatedContext = {
        ...ctx,
        req: {
          ...ctx.req,
          session: userSession,
        },
      }
      return getProps(authenticatedContext)
    } catch (err) {
      return {
        redirect: {
          permanent: false,
          destination: '/?error=unauthorized',
        },
      }
    }
  }
}
