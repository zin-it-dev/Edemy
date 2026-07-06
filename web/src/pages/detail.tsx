import { fetchCourse } from '@/services/course.service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

const Detail = () => {
  const { slug = '' } = useParams();

  const { isPending, data, error } = useQuery({
    queryKey: ['courses', slug] as const,
    queryFn: ({ queryKey }) => fetchCourse(queryKey[1]),
    enabled: !!slug,
  });

  console.log(data);

  return (
    <div>
      {isPending ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <h1>{data?.name}</h1>
          <p>{data?.price}</p>
          <p>{data.description}</p>
        </>
      )}
    </div>
  );
};

export default Detail;
