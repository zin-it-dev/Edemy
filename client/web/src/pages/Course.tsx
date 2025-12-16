import { useCourse } from "@/hooks/useCourses";
import { useParams } from "react-router";

const Course = () => {
  const { slug } = useParams();
  const { data, isPending } = useCourse(slug!);

  return (
    data && (
      <div>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          <section>
            <h1>{data.name}</h1>
          </section>
        )}
      </div>
    )
  );
};

export default Course;
