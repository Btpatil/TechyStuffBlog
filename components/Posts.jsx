// 'use client'

import Link from "next/link"
import { Post } from "./Post"
import Image from "next/image"
import { getPosts } from "@lib/getPosts"
import { Suspense } from "react"
// import { useEffect, useState } from "react"

export function Loading() {
    return (
        <>
            <h3 className="h-4 bg-gray-500 rounded-md dark:bg-gray-700" style={{ width: '80%' }}></h3>

            <ul className="mt-5 space-y-3">
                <li className="w-full h-12 bg-gray-400 rounded-md dark:bg-gray-700"></li>
                <li className="w-full h-12 bg-gray-400 rounded-md dark:bg-gray-700"></li>
                <li className="w-full h-12 bg-gray-400 rounded-md dark:bg-gray-700"></li>
                <li className="w-full h-12 bg-gray-400 rounded-md dark:bg-gray-700"></li>
            </ul>
        </>
    )
}

export async function Posts() {
    let posts = await getPosts()
    // const [posts, setPosts] = useState(null)

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         const res = await fetch(`api/GetPosts`)
    //         const data = await res.json()

    //         setPosts(data)
    //     }
    //     fetchPosts()
    // }, [])

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 w-full mt-4">
            <Suspense fallback={<Loading />}>
                {posts ? posts.map(post =>
                    <Post key={post.id} post={post} />
                ) : <h1 className="">Posts Not Found</h1>}
            </Suspense>
        </div>
    )
}
