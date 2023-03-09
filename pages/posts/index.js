import { useRouter } from 'next/router'
import { useEffect } from 'react'
import dados from '../../dados.json'

export const getServerSideProps = (context) => {
  const posts = dados.posts.filter((post) => post.date === context.query.date)
  console.log(context.query)

  return {
    props: {
      posts,
    },
  }
}

export default function Posts({ posts }) {
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <pre key={post.id}>{JSON.stringify(post, null, 2)}</pre>
        ))
      ) : (
        <p>Nenhum post encontrado</p>
      )}
    </div>
  )
}
