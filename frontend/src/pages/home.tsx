import { Box, Text, Image } from '@skynexui/components'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import dynamic from 'next/dynamic'
import { authService } from '../services/auth/authService'
import { withSession } from '../services/auth/sessionDecorator'

const Post = dynamic(() => import('../components/Post'))

export const getServerSideProps = withSession(async (ctx) => {
  const data = await fetch(`https://fakeapi-omariosouto.vercel.app/api/posts`)
    .then((res) => res.json())
    .catch((err) => alert(err))
  const firstFourPosts = data.posts.slice(0, 4)
  return {
    props: {
      session: ctx.req.session,
      firstFourPosts,
    },
  }
})

export default function HomeScreen({
  firstFourPosts,
  userSession,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const infos = {
    nome: 'Izzy Andrade',
    githubUser: 'izzyandrade',
  }
  const posts = firstFourPosts

  return (
    <>
      <div>{JSON.stringify(userSession)}</div>
      <Box
        styleSheet={{
          flexDirection: 'column',
          margin: '32px auto',
          maxWidth: '800px',
          paddingHorizontal: '16px',
        }}
      >
        <Image
          src={`https://github.com/${infos.githubUser}.png`}
          styleSheet={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            margin: '0 auto',
            border: '2px solid #F9703E',
          }}
        />
        <Text
          variant="heading1"
          tag="h1"
          styleSheet={{ color: '#F9703E', justifyContent: 'center' }}
        >
          {infos.nome}
        </Text>

        <Box
          styleSheet={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            marginTop: '16px',
            gridGap: '16px',
          }}
        >
          {posts.map(({ title, content, id }) => (
            <Post key={id} title={title} content={content} id={id} />
          ))}
        </Box>
      </Box>
    </>
  )
}
