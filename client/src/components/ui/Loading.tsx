import React from "react";
import { Container, Spinner } from "react-bootstrap";

type LoadingProps = {
  message?: string;
  size?: "sm" | "lg";
  fullScreen?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
};

const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  size = "lg",
  fullScreen = false,
  variant = "primary",
}) => {
  const content = (
    <div className="text-center py-5">
      <Spinner
        animation="border"
        variant={variant}
        style={{
          width: size === "lg" ? "3rem" : "1.5rem",
          height: size === "lg" ? "3rem" : "1.5rem",
        }}
      />
      {message && <p className="mt-3 text-muted">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <Container
        fluid
        className="d-flex align-items-center justify-content-center min-vh-100"
      >
        {content}
      </Container>
    );
  }

  return content;
};

export default Loading;
