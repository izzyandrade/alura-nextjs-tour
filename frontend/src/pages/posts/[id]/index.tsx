import NextLink from 'next/link'
import { Box, Text } from '@skynexui/components'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'

//tell next about the static paths it needs to know about
// Generates `/posts/1` and `/posts/2`
export const getStaticPaths: GetStaticPaths = () => {
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
    // We'll pre-render only these paths at build time. In this case, none.
    // { fallback: 'blocking' } will server-render pages
    // on-demand if the path doesn't exist.
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const { id } = context.params
  const post = await fetch(
    `https://fakeapi-omariosouto.vercel.app/api/posts/${id}`,
  ).then((res) => res.json())

  return {
    // Passed to the page component as props
    props: {
      post,
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10,
    },
  }
}

export default function PostByIdScreen(props): JSX.Element {
  const router = useRouter()
  const { post } = props

  if (router.isFallback) {
    return <div>Essa página não existe!</div>
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
