import React from "react";
import { Row, Container, DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router";

import Hero from "@/components/ui/Hero";
import Item from "@/components/ui/Item";
import { useCategories } from "@/hooks/useCategories";
import { useCourses } from "@/hooks/useCourses";
import Search from "@/components/ui/Search";
import Paginator from "@/components/ui/Paginator";

const Home: React.FC = () => {
  const { data } = useCourses();
  const { data: categories } = useCategories();

  return (
    <>
      <Hero />

      <Container>
        {/* Official Courses */}
        <section className="mt-4 mb-5">
          <div className="d-flex justify-content-between align-items-center py-2">
            <h3 className="fw-bold">Official Courses</h3>

            <div className="d-flex gap-3 flex-lg-row flex-column">
              <DropdownButton id="dropdown-basic-button" title="Categories">
                {categories?.map((category) => (
                  <Dropdown.Item
                    key={category.slug}
                    as={Link}
                    to={`/?category=${category.slug}`}
                  >
                    {category.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              <Search />
            </div>
          </div>

          {data?.results && data?.results.length > 0 ? (
            <>
              <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                {data.results.map((course) => (
                  <Item key={course.slug} {...course} />
                ))}
              </Row>

              <Paginator count={data.count} page_size={data.page_size} />
            </>
          ) : (
            <p className="text-center py-5 fst-italic text-warning">
              No results found. . .
            </p>
          )}
        </section>
      </Container>
    </>
  );
};

export default Home;
