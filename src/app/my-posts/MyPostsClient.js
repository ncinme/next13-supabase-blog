'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSupabase } from "../../components/supabase-provider"            // getting the client-side Supabase client

import { Suspense } from 'react'
import Loading from './loading'

export default function MyPostsClient() {
  const { supabase } = useSupabase()

  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .filter('user_id', 'eq', user.id)
    setPosts(data)
  }

  async function deletePost(id) {
    await supabase
      .from('posts')
      .delete()
      .match({ id })
    fetchPosts()
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">My Posts</h1>
      <Suspense fallback={<Loading />}>
        {
          posts.map((post, index) => (
            <div key={index} className="border-b border-gray-300	mt-8 pb-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-500 mt-2 mb-2">Author: {post.user_email}</p>
              <Link href={`/edit-post/${post.id}`} className="text-sm mr-4 text-blue-500">Edit Post</Link>
              <Link href={`/posts/${post.id}`} className="text-sm mr-4 text-blue-500">View Post</Link>
              <button
                className="text-sm mr-4 text-red-500"
                onClick={() => deletePost(post.id)}
              >Delete Post</button>
            </div>
          ))
        }
      </Suspense>
    </div>
  )
}