// import { fetchCourses } from '@/services/course.service';
// import type { Course } from '@/utils/types';
// import { useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router';
import About from '@/components/ui/about';
import FAQs from '@/components/ui/faqs';
import Hero from '@/components/ui/hero';
import Popular from '@/components/ui/popular';
import Testimonials from '@/components/ui/testimonials';

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
