import Container from "react-bootstrap/Container";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import {
  fetchTaskStatus,
  generateCourseOutline,
  type Outline,
} from "@/services/course.service";
import { schema, type AgentFormData } from "@/libs/validations/agent.schema";
import { useState } from "react";

const Generator = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AgentFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      topic: "",
      level: "Beginner",
      video: "Yes",
      duration: "1 Hours",
      chapters: 1,
    },
  });

  const [id, setId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: generateCourseOutline,
    onSuccess: (data) => {
      if (data.task_id) {
        setId(data.task_id);
      }
    },
    onError: (error) => {
      alert(`Error during generation: ${error.message}`);
      setId(null);
    },
  });

  const FINAL_STATUSES = ["SUCCESS", "FAILURE", "REVOKED"];

  const { data } = useQuery<Outline>({
    queryKey: ["status", id],
    queryFn: () => fetchTaskStatus(id!),
    enabled: !!id,
    refetchInterval: (data) => {
      const status = data.state.data?.status;

      if (status === "SUCCESS") {
        navigate(`/tutor/outline/${id}`);
        return false;
      }

      if (status && FINAL_STATUSES.includes(status)) {
        return false;
      }

      return 2000;
    },
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
  });

  const currentStatus = data?.status || "PENDING";
  const isGenerating =
    mutation.isPending || (id !== null && currentStatus !== "SUCCESS");

  const onSubmit: SubmitHandler<AgentFormData> = (data) => {
    if (isGenerating) return;
    mutation.mutate(data);
    console.log(data);
  };

  const options = ["Beginner", "Intermediate", "Advanced"];
  const durations = ["1 Hours", "2 Hours", "More than 3 Hours"];
  const videos = ["Yes", "No"];

  console.log("Current Query Data:", data);

  return (
    <Container className="my-lg-5 my-4">
      <div className="text-center mb-4">
        <h1 className="text-light fw-bold">🧠 What can I help you learn?</h1>
        <p>Enter a topic below to generate a personalized course for it</p>
      </div>

      {isGenerating && (
        <Alert variant="info" className="d-flex align-items-center mb-4">
          <Spinner animation="border" size="sm" className="me-2" />
          <span>Đang tạo giáo trình... (Trạng thái: **{currentStatus}**)</span>
        </Alert>
      )}

      <Form className="mx-auto col-lg-8" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>
            💡Write the topic for which you want to generate a course (e.g.,
            Python, Yoga, etc.):
          </Form.Label>
          <Form.Control
            type="text"
            {...register("topic")}
            isInvalid={!!errors.topic}
            name={"topic"}
            placeholder="Enter a topic below to generate a personalized course for it"
          />
          <Form.Control.Feedback type="invalid">
            {errors.topic?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            ✍️ Tell us more about your course, what you want to include in the
            course (Optional)
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="About your course"
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>🎓 Level</Form.Label>
              <Form.Select aria-label="Select">
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>⏰ Duration</Form.Label>
              <Form.Select aria-label="Select">
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>🎥 Include Video</Form.Label>
              <Form.Select aria-label="Select">
                {videos.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>📖 Chapters</Form.Label>
              <Form.Control
                type="number"
                defaultValue={1}
                placeholder="Enter number of chapters"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting || isGenerating}
        >
          {isGenerating ? "Processing..." : "Generate"}
        </Button>
      </Form>
    </Container>
  );
};

export default Generator;
