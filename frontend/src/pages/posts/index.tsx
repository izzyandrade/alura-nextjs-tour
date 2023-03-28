import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import dados from '../../../dados.json'

interface Post {
  id: number
  video: String
  title: String
  content: String
  date: String
}

interface Posts {
  posts: Post[]
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const posts = dados.posts.filter((post) => post.date === context.query.date)

  return {
    props: {
      posts,
    },
  }
}

export default function Posts({ posts }: Posts): JSX.Element {
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post: Post) => (
          <pre key={post.id}>{JSON.stringify(post, null, 2)}</pre>
        ))
      ) : (
        <p>Nenhum post encontrado</p>
      )}
    </div>
  )
}
