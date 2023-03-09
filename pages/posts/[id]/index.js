import NextLink from 'next/link'
import { Box, Text } from '@skynexui/components'
import { useRouter } from 'next/router'

//tell next about the static paths it needs to know about
// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  // const data = await fetch(
  //   `https://fakeapi-omariosouto.vercel.app/api/posts`,
  // ).then((res) => res.json())
  // const paths = data.posts.map((post) => {
  //   return { params: { id: `${post.id}` } }
  // })
  /*
  the above block of code makes an API request to get a list of posts and use those
  posts to tell Next how many pages are there, this way next can pre-render those
  with getStaticProps(), it is commented because we are now showing how to apply
  Incremental Static Generation (ISG) by using "blocking" as the fallback option
  */

  return {
    paths: [],
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  const { id } = context.params
  const post = await fetch(
    `https://fakeapi-omariosouto.vercel.app/api/posts/${id}`,
  ).then((res) => res.json())

  return {
    // Passed to the page component as props
    props: {
      post,
    },
  }
}

export default function PostByIdScreen(props) {
  // console.log(props);
  const router = useRouter()
  // console.log(router);
  const { post } = props

  if (router.isFallback) {
    return 'Essa página não existe!'
  }

  return (
    <Box
      styleSheet={{
        flexDirection: 'column',
        margin: '32px auto',
        maxWidth: '700px',
        paddingHorizontal: '16px',
      }}
    >
      {/* Cabeçalho */}
      <Text
        variant="heading2"
        tag="h1"
        styleSheet={{
          color: '#F9703E',
          justifyContent: 'center',
          lineHeight: '1.2',
        }}
      >
        {post.title}
      </Text>
      <Text
        styleSheet={{
          color: '#F9703E',
          justifyContent: 'center',
          borderBottom: '1px solid #F9703E',
          paddingVertical: '16px',
          marginVertical: '16px',
        }}
      >
        {post.date}
      </Text>

      {/* Área de Conteudo */}
      <Box
        styleSheet={{
          flexDirection: 'column',
        }}
      >
        <Text>{post.content}</Text>

        {post.video && (
          <iframe
            style={{ marginTop: '32px', minHeight: '400px' }}
            src={post.video}
          />
        )}
      </Box>

      {/* Rodapé */}
      <Box
        styleSheet={{
          marginTop: '16px',
          paddingVertical: '16px',
          borderTop: '1px solid #F9703E',
          color: '#F9703E',
        }}
      >
        <NextLink href="/" passHref>
          <Text tag="a" styleSheet={{ hover: { textDecoration: 'underline' } }}>
            Voltar para a home
          </Text>
        </NextLink>
      </Box>
    </Box>
  )
}
