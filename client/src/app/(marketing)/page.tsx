"use client";
// import { Suspense, use } from "react";
// import { Button } from "@/components/ui/button"

// function Posts({ posts }: { posts: Promise<{ id: string; name: string }[]> }) {
//     const allPosts = use(posts);

//     return (
//         <ul>
//             {allPosts.map((post) => (
//                 <li key={post.id}>{post.name}</li>
//             ))}
//         </ul>
//     );
// }

// async function getPosts(): Promise<{ id: string; name: string }[]> {
//   const res = await fetch('http://localhost:8000/categories/');
//   return res.json()
// }

export default function Home() {
    // const posts = getPosts();

    return (
        <div className='flex'>
            {/* <Suspense fallback={<div>Loading...</div>}>
                {posts ? <Posts posts={posts} /> : <p>No items!</p>}
                <Button>Button</Button>
            </Suspense> */}
            <h1>Hello</h1>
        </div>
    );
}
