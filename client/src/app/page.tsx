"use client";
import { Suspense, use } from "react";
import { Button } from "@/components/ui/button"

function Posts({ posts }: { posts: Promise<{ id: string; name: string }[]> }) {
    const allPosts = use(posts);

    return (
        <ul>
            {allPosts.map((post) => (
                <li key={post.id}>{post.name}</li>
            ))}
        </ul>
    );
}

async function getPosts(): Promise<{ id: string; name: string }[]> {
  const res = await fetch('http://localhost:8000/categories/');
  return res.json()
}

export default function Home() {
    const posts = getPosts();

    return (
        <div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
            <Suspense fallback={<div>Loading...</div>}>
                <Posts posts={posts} />

                <Button>Button</Button>
            </Suspense>
        </div>
    );
}
