// This is migrated from pages/index.js. It default exports a Client Component

'use client';

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSupabase } from "./supabase-provider"            // getting the client-side Supabase client

export default function Home() {
    const { supabase } = useSupabase()

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    // this is for real time update to the Home Page - after Add, Update, Delete of any post
    useEffect(() => {
        fetchPosts()
        const channel = supabase
            .channel('*')
            .on('*', () => {
                console.log('something happened....')
                fetchPosts()
            })
            .subscribe()
        return () => supabase.removeChannel(channel)
    }, [supabase, posts])
    async function fetchPosts() {
        const { data, error } = await supabase
            .from('posts')
            .select()
        setPosts(data)
        setLoading(false)
    }
    if (loading) return <p className="text-2xl">Loading ...</p>
    if (!posts.length) return <p className="text-2xl">No posts.</p>

    return (
        <div>
            <Head>
                <title>Supablog</title>
            </Head>

            <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Posts</h1>
            {
                posts.map(post => (
                    <Link key={post.id} href={`/posts/${post.id}`} className="block border-b border-gray-300	mt-8 pb-4">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-500 mt-2">Author: {post.user_email}</p>
                    </Link>)
                )
            }
        </div>
    )
}