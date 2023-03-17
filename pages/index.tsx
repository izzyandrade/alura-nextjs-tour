import { Box, Text, Image } from '@skynexui/components'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import dynamic from 'next/dynamic'
import dados from '../dados.json'

const Post = dynamic(() => import('../components/Post'))

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const data = await fetch(
    `https://fakeapi-omariosouto.vercel.app/api/posts`,
  ).then((res) => res.json())
  const firstFourPosts = data.posts.slice(0, 4)

  return {
    props: {
      firstFourPosts,
    },
  }
}

export default function HomeScreen(props): JSX.Element {
  const infos = {
    nome: 'Izzy Andrade',
    githubUser: 'izzyandrade',
  }
  const posts = props.firstFourPosts

  return (
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
  )
}
