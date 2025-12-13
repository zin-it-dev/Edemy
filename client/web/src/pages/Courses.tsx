import { Container } from "react-bootstrap";

import CourseContainer from "@/components/containers/CourseContainer";
import { useCategories } from "@/hooks/useCategories";
import { Link } from "react-router";

const Courses = () => {
  const { data: categories } = useCategories();

  return (
    <Container>
      <ul>
        {categories?.map((item) => (
          <li key={item.id}>
            <Link to={`/courses/?category=${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>

      {/* Course List */}
      <CourseContainer />
    </Container>
  );
};

export default Courses;
