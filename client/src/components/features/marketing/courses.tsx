'use client'

import { useQuery } from "@tanstack/react-query"


export default function Courses() {
  const { data } = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourses(),
  })
}