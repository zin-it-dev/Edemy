import Container from "react-bootstrap/Container";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  generateCourseOutline
} from "@/services/course.service";
import { schema, type AgentFormData } from "@/libs/validations/agent.schema";

const Generator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AgentFormData>({
    resolver: zodResolver(schema)
  });

  const mutation = useMutation({
    mutationFn: generateCourseOutline,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      alert(`Error during generation: ${error.message}`)
    },
  });

  const onSubmit: SubmitHandler<AgentFormData> = (data) => {
    if (isSubmitting) return;
    mutation.mutate(data);
    console.log(data);
  };

  const options = ["Beginner", "Intermediate", "Advanced"];
  const durations = ["1 Hours", "2 Hours", "More than 3 Hours"];
  const videos = ["Yes", "No"];

  return (
    <Container className="my-lg-5 my-4">
      <div className="text-center mb-4">
        <h1 className="text-light fw-bold">🧠 What can I help you learn?</h1>
        <p>Enter a topic below to generate a personalized course for it</p>
      </div>

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
              <Form.Select aria-label="Select" {...register("level")} disabled={isSubmitting}>
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
              <Form.Select aria-label="Select" {...register("duration")} disabled={isSubmitting}>
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
              <Form.Select aria-label="Select" {...register("video")} disabled={isSubmitting}>
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
                {...register("chapters", { valueAsNumber: true })}
                disabled={isSubmitting}
                defaultValue={1}
                placeholder="Enter number of chapters"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {mutation.isPending ? "Processing..." : "Generate"}
        </Button>
      </Form>
    </Container>
  );
};

export default Generator;
