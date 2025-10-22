import { fetchTaskStatus, type Outline } from "@/services/course.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";

const Outline: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<Outline>({
    queryKey: ["status", id],
    queryFn: () => fetchTaskStatus(id!),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{data?.result.title}</h1>

      <h3>Các Module Khóa Học:</h3>
      {data?.result.modules.map((module, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h4>
            {index + 1}. {module.title}
          </h4>
          <ul>
            {module.lessons.map((route) => (
              <li key={route.title}>{route.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Outline;
