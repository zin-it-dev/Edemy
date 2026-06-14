// import { fetchCourses } from '@/services/course.service';
// import type { Course } from '@/utils/types';
// import { useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router';
import About from '@/components/ui/About';
import FAQs from '@/components/ui/FAQs';
import Hero from '@/components/ui/Hero';
import Loading from '@/components/ui/Loading';
import Popular from '@/components/ui/Popular';
import Testimonials from '@/components/ui/Testimonials';
import { useAuth } from '@clerk/react';
import { Navigate } from 'react-router';

const Home = () => {
  // const { isPending, isError, data, error } = useQuery(
  //   {
  //     queryKey: ['courses'] as const,
  //     queryFn: fetchCourses,
  //     select: (data) => ({
  //       page_size: data.page_size,
  //       count: data.count,
  //       results: data?.results || []
  //     })
  //   }
  // );

  // const { results = [] } = data || {};

  // console.log(data);

  // if (isPending) {
  //   return <span>Loading...</span>
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>
  // }

  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loading />;
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      {/* <h1>Home</h1>

      <ul>
        {results.map((course: Course) => <li key={course.id}>
          <Link to={`/courses/${course.slug}`}>{course.name}</Link>
          <p>${course.price}</p>
        </li>)}
      </ul> */}

      <Hero />
      <About />
      <Popular />
      <FAQs />
      <Testimonials />
    </>
  );
};

export default Home;
