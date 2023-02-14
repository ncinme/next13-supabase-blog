// 'user client'

import 'server-only'


// import { useRouter } from "next/navigation";  // this has changed from next/router
import ReactMarkdown from 'react-markdown'
// import { createClient } from '../../utils/supabase-server'
import { createServerClient } from '../../../utils/supabase-server'

import { notFound } from "next/navigation";

export const revalidate = 60


// export async function generateStaticParams() {
//   const { data: posts } = await supabase.from("posts").select("id");

//   console.log("generateStaticParams", params)

//   // return posts?.map((post) => ({id (or slug): post.id})); slug or id is nothing but what is added to the path after '/posts/' in this case
//   return posts?.map(({ id }) => ({
//     id,
//     fallback: true
//   }));
// }

export default async function Post({ params }) {
  const supabase = createServerClient()

  // const { data } = await supabase.from('posts').select('*')

  // return <pre>{JSON.stringify({ data }, null, 2)}</pre>

  // const router = useRouter()
  // if (router.isFallback) {
  //   return <div>Loading...</div>
  // }

  console.log("params", params)
  const id = params.id
  const { data: post } = await supabase
    .from("posts")
    .select()
    .match({ id })        // or   .filter('id', 'eq', id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-5xl mt-4 font-semibold tracking-wide">{post.title}</h1>
      <p className="text-sm font-light my-4">by {post.user_email}</p>
      <div className="mt-8">
        <ReactMarkdown className='prose' children={post.content} />
      </div>
    </div>
  )
}
