import { withSessionHOC } from '../services/auth/sessionDecorator'

function About({ loading, session }): JSX.Element {
  return <div>{loading ? 'Loading page...' : JSON.stringify(session)}</div>
}

export default withSessionHOC(About)
