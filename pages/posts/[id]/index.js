import NextLink from 'next/link'
import { Box, Text } from '@skynexui/components'
import { useRouter } from 'next/router'
import dados from '../../../dados.json'

//tell next about the static paths it needs to know about
// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  const paths = dados.posts.map((post) => {
    return { params: { id: post.id } }
  })

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  const { id } = context.params
  const post = dados.posts.find((post) => {
    if (post.id === id) return true
    return false
  })
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
