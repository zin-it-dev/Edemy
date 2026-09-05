"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { latestCoursesQueryOptions } from "@/services/catalog";

const formatPrice = (price: string) => {
  const numericPrice = Number(price);
  return numericPrice === 0
    ? "Free"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(numericPrice);
};

export const LatestCourses = () => {
  const { data: coursesResponse, isLoading, isError } = useQuery(
    latestCoursesQueryOptions(),
  );
  const courses = coursesResponse?.results ?? [];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8" aria-labelledby="latest-courses-title">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">Keep learning</p>
          <h2 id="latest-courses-title" className="mt-1 text-3xl font-semibold tracking-tight">
            Newest courses
          </h2>
        </div>
        <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
          View all
        </Link>
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <CardHeader className="gap-3">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent><Skeleton className="h-10 w-full" /></CardContent>
            </Card>
          ))}
        </div>
      )}

      {isError && <p className="text-sm text-muted-foreground">Courses are unavailable right now.</p>}

      {!isLoading && !isError && courses.length === 0 && (
        <p className="text-sm text-muted-foreground">New courses are coming soon.</p>
      )}

      {!isLoading && !isError && courses.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`} className="group">
              <Card className="h-full transition-colors group-hover:border-primary/60">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
                    <Badge variant="secondary">{formatPrice(course.price)}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">{course.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};