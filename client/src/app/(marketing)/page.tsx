// "use client"
// import { useState } from 'react'
// import { useAuth } from '@clerk/nextjs'
import Link from "next/dist/client/link";
import { Hero } from "@/components/features/marketing/hero";
import { LatestCourses } from "@/components/features/marketing/latest-courses";
// import { Testimonials } from "@/components/features/marketing/testimonials"

export default function Home() {
    // const { getToken } = useAuth()
    // const [data, setData] = useState({})

    // async function callProtectedAuthRequired() {
    //   const token = await getToken()
    //   console.log(token)
    // }

    return (
        <>
            {/* Hero */}
            <Hero />

            {/* Last Courses */}
            <LatestCourses />

            {/* <Testimonials /> */}
            <Link href='/courses'>Courses</Link>
        </>
    );
}
