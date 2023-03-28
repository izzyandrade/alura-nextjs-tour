import { authService } from './authService'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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

export const withSessionHOC = (Component) => {
  return function Wrapper(props) {
    const { loading, error, session } = useSession()
    const router = useRouter()

    if (error) {
      router.push('/?error=401')
    }

    const modifiedProps = {
      ...props,
      session,
      loading,
    }

    return <Component {...modifiedProps} />
  }
}

export function useSession() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    authService
      .getSession()
      .then((userSession) => {
        setSession(userSession)
      })
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return {
    session,
    error,
    loading,
  }
}
