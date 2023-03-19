import { useRouter } from "next/router"
import Link from "next/link"

export default function Comments(){
  const router = useRouter();
  return(
    <div>
      Comments do post  - {router.query.id}
      <hr/>
      <ul>
        <li><Link href="/home">Home</Link></li>
        <li><Link href={`/posts/${router.query.id}`}>Back to Post</Link></li>
      </ul>
    </div>
  )
}